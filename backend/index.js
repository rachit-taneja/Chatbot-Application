import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import chatbotRouters from './routers/chatbot.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 4002;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.log("Mongo Error:", err));

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatbot-application-five.vercel.app",
    "https://chatbot-application-git-main-rachit-tanejas-projects.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use("/bot/v1", chatbotRouters);

app.listen(port, () => {
  console.log(`🚀 API running on port ${port}`);
});