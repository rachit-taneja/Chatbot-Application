import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import chatbotRouters from './routers/chatbot.route.js';

const app = express();

// Load environment variables
dotenv.config();

// PORT and Mongo URI
const port = process.env.PORT || 4002;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("❌ Error connecting to MongoDB:", error));

// Middleware
app.use(express.json());

// ✅ Enable CORS for Vite frontend (port 5173)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

// Routes
app.use("/bot/v1", chatbotRouters);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🔗 Endpoint: http://localhost:${port}/bot/v1/message`);
});
