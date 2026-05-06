import express from "express";
const app = express();
import cors from "cors";

app.use(cors());

app.use(express.json());



// 1. Define Intents (Can be moved to a database or config file later)
const INTENTS = [
  {
    keywords: ["patient", "search", "find"],
    reply: "To find a patient, navigate to the 'Patient Directory' module and search by Name or ID."
  },
  {
    keywords: ["medical record", "emr", "report"],
    reply: "Patient Records can be accessed and updated via the 'Patient Records' tab. Ensure you have the proper authorization level."
  },
  {
    keywords: ["colleague", "message", "contact"],
    reply: "You can exchange data with other staff via the 'Secure Messaging' tab."
  }
];

app.post("/api/chat", (req, res) => {
  try {
    const { message } = req.body;

    // 2. Validate Input (Crucial for Professional Apps)
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: "Invalid message format." });
    }

    const lowerMsg = message.toLowerCase();
    
    // 3. Find Match using "some" for keyword checking
    const match = INTENTS.find(intent => 
      intent.keywords.some(keyword => lowerMsg.includes(keyword))
    );

    const reply = match 
      ? match.reply 
      : "I'm sorry, I couldn't find a specific answer. Please contact the ZAS Support Desk at support@zas.be.";

    // 4. Send structured JSON
    res.json({ 
      success: true,
      reply,
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000);