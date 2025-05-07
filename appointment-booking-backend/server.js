// server.js
import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import sendMail from './routes/sendMail.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use(cors());
app.use(json());

app.use('/api', sendMail)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
