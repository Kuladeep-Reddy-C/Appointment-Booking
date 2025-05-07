import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  attendeeEmail: {
    type: String,
    required: true,
  },
  date: {
    type: String, // you can use Date if you want to store it as a Date object
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  formattedDateTime: {
    type: String,
    required: true,
  },
  meetLink: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
