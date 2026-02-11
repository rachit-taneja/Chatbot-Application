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
      // { question: "hi", answer: "Hello! How can I help you today?" },
      // { question: "hello", answer: "Hey there! What’s up?" },
      // { question: "how are you", answer: "I’m doing great, thanks for asking! How about you?" },
      // { question: "your name", answer: "I’m ChatBot, your virtual assistant 🤖." },
      // { question: "bye", answer: "Goodbye! Have a nice day 👋." },
      // { question: "thanks", answer: "You’re welcome! 😊" },
      // { question: "who created you", answer: "this is created by Rachit, using Node.js and MongoDB!" },
      // { question: "help", answer: "Sure! You can ask me about greetings, my name, or general info." },
      // { question: "hi", answer: "Hello! How can I help you?" },
      
      
      
      // Greetings & Basic Talk
      { question: "hello", answer: "Hi there! 😊" },
      { question: "hey", answer: "Hey! What's up?" },
      { question: "good morning", answer: "Good morning! 🌞 Hope you have a great day." },
      { question: "good afternoon", answer: "Good afternoon! How can I assist you?" },
      { question: "good evening", answer: "Good evening! 🌆" },
      { question: "good night", answer: "Good night! 🌙 Sleep well." },
      { question: "what's up", answer: "Not much, just here to help you!" },
      { question: "howdy", answer: "Howdy! 🤠" },

      // Chatbot Identity
      { question: "who are you", answer: "I am a chatbot designed to help you." },
      { question: "your name", answer: "I’m ChatBot 🤖." },
      { question: "what is your name", answer: "My name is ChatBot." },
      { question: "are you human", answer: "No, I’m a virtual assistant." },
      { question: "are you real", answer: "I exist digitally to help you 😊." },
      { question: "who created you", answer: "I was created by Rachit using Node.js and MongoDB." },
      { question: "who is your developer", answer: "My developer is Rachit." },
      { question: "who made you", answer: "Rachit made me as a project." },

      // Feelings & Emotions
      { question: "how are you", answer: "I’m doing great! How about you?" },
      { question: "are you fine", answer: "Yes, I’m perfectly fine 😊." },
      { question: "are you happy", answer: "I’m always happy to help!" },
      { question: "are you sad", answer: "I don’t feel sadness, but I’m here for you." },
      { question: "are you angry", answer: "Nope 😄 I stay calm all the time." },
      { question: "do you have emotions", answer: "I don’t have emotions like humans." },

      // Help & Support

      { question: "help", answer: "Sure! Tell me what you need help with." },
      { question: "can you help me", answer: "Of course! 😊" },
      { question: "what can you do", answer: "I can answer common questions and chat with you." },
      { question: "how can you help", answer: "I help by answering your questions." },
      { question: "support", answer: "I’m here to support you." },


      // Time & Date
      { question: "what time is it", answer: "Please check your device for the current time ⏰." },
      { question: "what day is today", answer: "Please check your calendar 📅." },
      { question: "what is today date", answer: "I recommend checking your phone for the date." },

      // Tech & Programming
      { question: "what is programming", answer: "Programming is writing code to create software." },
      { question: "what is javascript", answer: "JavaScript is a popular programming language for web development." },
      { question: "what is node js", answer: "Node.js allows JavaScript to run on the server." },
      { question: "what is mongodb", answer: "MongoDB is a NoSQL database." },
      { question: "what is html", answer: "HTML is used to structure web pages." },
      { question: "what is css", answer: "CSS is used to style web pages." },
      { question: "what is backend", answer: "Backend handles server-side logic." },
      { question: "what is frontend", answer: "Frontend is what users see on a website." },
      { question: "what is api", answer: "API allows different software to communicate." },

      // Fun & Casual
      { question: "tell me a joke", answer: "Why do programmers hate nature? Too many bugs 😄." },
      { question: "are you smart", answer: "I try my best 🤓." },
      { question: "do you like humans", answer: "Yes! Humans are interesting." },
      { question: "do you sleep", answer: "Nope! I’m always awake 😎." },
      { question: "can you talk", answer: "Yes, through text!" },

      // Short Responses
      { question: "yes", answer: "Great!" },
      { question: "no", answer: "Okay 👍." },
      { question: "maybe", answer: "Alright, take your time." },
      { question: "ok", answer: "Cool 😊." },
      { question: "fine", answer: "Good to hear!" },

      // Gratitude & Politeness
      { question: "thanks", answer: "You’re welcome 😊." },
      { question: "thank you", answer: "Happy to help!" },
      { question: "bye", answer: "Goodbye! 👋" },
      { question: "see you", answer: "See you soon!" },
      { question: "goodbye", answer: "Take care! 😊" },

      // Common Questions
      { question: "where are you from", answer: "I exist in the digital world 🌐." },
      { question: "can you learn", answer: "I can be improved by my developer." },
      { question: "are you free", answer: "Yes, I’m always here for you." },
      { question: "what is your purpose", answer: "My purpose is to help users." },
      { question: "do you make mistakes", answer: "Sometimes, but I keep improving." },
      { question: "are you secure", answer: "Yes, I respect user privacy." },
      { question: "can you answer questions", answer: "Absolutely!" },
      { question: "do you work offline", answer: "No, I need the internet." },
      { question: "can you chat", answer: "Yes, chatting is my job 😄." },



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
