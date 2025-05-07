import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import _ from 'lodash';

function Gmeet() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading: sessionLoading } = useSessionContext();

  if (sessionLoading) {
    return <div className="loading">Loading...</div>;
  }

  function combineDateTime(date, timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const dateObj = new Date(date);
    dateObj.setHours(hours, minutes, 0, 0);
    return dateObj;
  }

  async function createCalendarEvent() {
    if (!eventName) {
      alert("Please enter an event name");
      return;
    }

    setIsLoading(true);

    const startDateTime = combineDateTime(selectedDate, startTime);
    const endDateTime = combineDateTime(selectedDate, endTime);

    const formatDate = (date) => {
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    };

    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: startDateTime.toLocaleString('sv-SE').replace(' ', 'T'),
        timeZone: 'Asia/Kolkata'
      },
      end: {
        dateTime: endDateTime.toLocaleString('sv-SE').replace(' ', 'T'),
        timeZone: 'Asia/Kolkata'
      },
      attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
      conferenceData: {
        createRequest: {
          requestId: String(Date.now()),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
        {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + session.provider_token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }
      );

      const data = await response.json();

      if (response.ok) {
        const meetLink = data.conferenceData?.entryPoints?.find(ep => ep.entryPointType === "video")?.uri || 'No Meet link generated';
        setSuccessMessage(`Event "${eventName}" created for ${formatDate(startDateTime)}. Meet link: ${meetLink}`);
        setShowSuccessMessage(true);

        // Console log meeting details for debugging
        const meetingDetails = {
          eventName: eventName,
          date: selectedDate.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          startTime: startTime,
          endTime: endTime,
          meetLink,
          attendeeEmail: attendeeEmail || 'No attendee specified',
          formattedDateTime: formatDate(startDateTime)
        };
        console.log('Meeting Details for Email:', meetingDetails);
        

        // Send email
        try {
          const emailResponse = await fetch(`${url}/api/send-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: attendeeEmail,
              eventName,
              date: selectedDate.toLocaleDateString('en-IN'),
              timeRange: `${startTime} to ${endTime}`,
              meetLink,
              description: eventDescription
            })
          });
          const emailData = await emailResponse.json();
          if (!emailResponse.ok) {
            console.error('Email API error:', emailData);
            alert('Failed to send email: ' + emailData.message);
          } else {
            console.log('Email sent successfully:', emailData);
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          alert('Error sending email. Please try again.');
        }

        // Reset form
        setEventName('');
        setEventDescription('');
        setAttendeeEmail('');

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 7000);
      } else {
        alert(`Error creating event: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert("Error creating event. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const timeOptions = _.times(24, (hour) => {
    return [
      `${hour.toString().padStart(2, '0')}:00`,
      `${hour.toString().padStart(2, '0')}:30`
    ];
  }).flat();

  return (
    <div className="App">
      <div className="container mt-20">
        <h1>Calendar Event Creator</h1>
        <p className="subtitle">Create events on your Google Calendar with Meet link</p>

        {session ? (
          <div className="event-form">
            <div className="user-info">
              <h2>Welcome, {session?.user?.user_metadata?.full_name}</h2>
            </div>

            {showSuccessMessage && (
              <div className="success-message">
                <p>{successMessage}</p>
              </div>
            )}

            <div className="calendar-section">
              <h3>Select Date</h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                locale="en-IN"
                className="calendar"
              />
            </div>

            <div className="form-section">
              <div className="time-selection">
                <div className="form-group">
                  <label>Start Time</label>
                  <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                    {timeOptions.map(time => (
                      <option key={`start-${time}`} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>End Time</label>
                  <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                    {timeOptions.map(time => (
                      <option key={`end-${time}`} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                  className="text-input"
                />
              </div>

              <div className="form-group">
                <label>Event Description</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Enter event description"
                  className="text-input"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Invite Email</label>
                <input
                  type="email"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  placeholder="Enter email to invite"
                  className="text-input"
                />
              </div>

              <button
                className="create-btn"
                onClick={createCalendarEvent}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Calendar Event'}
              </button>
            </div>
          </div>
        ) : (
          <div className="login-container">
            <p>Please sign in to create calendar events</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gmeet;