// server.js
import express, { json } from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());

app.post('/send-email', async (req, res) => {
  const { to, eventName, date, timeRange, meetLink, description } = req.body;

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS  // your Gmail App Password (not your normal password)
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
        <li><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></li>
        <li><strong>Description:</strong> ${description}</li>
      </ul>
      <p>Please join the meeting at the specified time.</p>
      <p>Best regards,<br/>Your Calendar App</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
