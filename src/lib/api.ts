
import axios from "axios";
import { ChatRequestSchema, ChatResponseSchema, ChatMessage } from "@/types/chat";

// Create axios instance with base URL
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE || "/api", // Fallback to /api if env not set
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptors for logging, auth token, etc.
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export async function sendChat(messages: ChatMessage[]): Promise<{
  reply: string;
  sentimentAnalysis?: {
    score: number;
    category: string;
  };
}> {
  try {
    const payload = ChatRequestSchema.parse({ messages });
    const response = await api.post("/chat", payload);
    const parsedResponse = ChatResponseSchema.parse(response.data);
    return parsedResponse;
  } catch (error) {
    console.error("Error sending chat:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to send message");
  }
}

// Mock function to simulate API response for development
export async function mockSendChat(messages: ChatMessage[]): Promise<{
  reply: string;
  sentimentAnalysis?: {
    score: number;
    category: string;
  };
}> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const userMessage = messages[messages.length - 1].message.toLowerCase();
  
  // Analyze message for sentiment
  let sentimentScore = 5;
  let category = "neutral";
  
  // Simple keyword detection for PHQ-9 categories
  if (userMessage.includes("sad") || userMessage.includes("depressed") || userMessage.includes("unhappy")) {
    sentimentScore = 2;
    category = "depressed";
  } else if (userMessage.includes("tired") || userMessage.includes("exhausted") || userMessage.includes("no energy")) {
    sentimentScore = 3;
    category = "fatigue";
  } else if (userMessage.includes("can't sleep") || userMessage.includes("insomnia") || userMessage.includes("tired")) {
    sentimentScore = 2;
    category = "sleep";
  } else if (userMessage.includes("happy") || userMessage.includes("great") || userMessage.includes("good")) {
    sentimentScore = 8;
    category = "positive";
  }
  
  // Generate appropriate response based on sentiment
  let reply = "I understand. How long have you been feeling this way?";
  
  if (sentimentScore < 3) {
    reply = "I'm sorry to hear you're feeling this way. Would you like to talk more about what's been going on?";
  } else if (sentimentScore > 7) {
    reply = "I'm glad to hear you're doing well! What's been going right for you lately?";
  }
  
  return {
    reply, // This is now guaranteed to be a string
    sentimentAnalysis: {
      score: sentimentScore, // This is now guaranteed to be a number
      category, // This is now guaranteed to be a string
    }
  };
}
