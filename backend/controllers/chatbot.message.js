import User from "../models/user.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text)
    if (!text?.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    // Save user message
    const user = await User.create({
      sender: "user",
      text,
    });

    // Knowledge base (static for now)
    const knowledgeBase = [
      { question: "hi", answer: "Hello! How can I help you today?" },
      { question: "hello", answer: "Hey there! What’s up?" },
      { question: "how are you", answer: "I’m doing great, thanks for asking! How about you?" },
      { question: "your name", answer: "I’m ChatBot, your virtual assistant 🤖." },
      { question: "bye", answer: "Goodbye! Have a nice day 👋." },
      { question: "thanks", answer: "You’re welcome! 😊" },
      { question: "who created you", answer: "this is created by Rachit, using Node.js and MongoDB!" },
      { question: "help", answer: "Sure! You can ask me about greetings, my name, or general info." },
    ];

    // Normalize user text
    const normalizedText = text.toLowerCase().trim();

    // Search in knowledgeBase
    const found = knowledgeBase.find(
      (item) => item.question === normalizedText
    );

    const botText = found ? found.answer : "Sorry, I don't understand that !!!";

    // Save bot message
    const bot = await User.create({
      sender: "bot",
      text: botText,
    });

    // Send response
    // Send response
return res.status(200).json({
  user: user.text,
  bot: bot.text
});

  } catch (error) {
    console.error("❌ Error in chatbot:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
