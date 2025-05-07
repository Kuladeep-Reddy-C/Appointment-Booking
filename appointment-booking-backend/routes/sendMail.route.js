import express from 'express';
import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';

dotenv.config();
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, eventName, date, timeRange, meetLink, description } = req.body;

 
  if (!to || !eventName || !date || !timeRange) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Calendar App" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Meeting Scheduled: ${eventName}`,
    html: `
      <p>Dear ${to},</p>
      <p>A new meeting has been scheduled with the following details:</p>
      <ul>
        <li><strong>Event:</strong> ${eventName}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${timeRange}</li>
        <li><strong>Google Meet Link:</strong> <a href="${meetLink || 'Not available'}">${meetLink || 'Not available'}</a></li>
        <li><strong>Description:</strong> ${description || 'No description provided'}</li>
      </ul>
      <p>Please join the meeting at the specified time.</p>
      <p>Best regards,<br/>Your Calendar App</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: `Failed to send email: ${error.message}` });
  }
});

export default router;