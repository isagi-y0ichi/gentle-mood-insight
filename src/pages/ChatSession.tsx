
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/ChatBubble";
import MoodSlider from "@/components/MoodSlider";
import { format } from "date-fns";

// Mock conversation starter
const initialMessages = [
  {
    id: "1",
    content: "Hello! How are you feeling today? I'm here to listen and help you navigate your thoughts and emotions.",
    sender: "ai",
    timestamp: format(new Date(), "h:mm a"),
  },
];

const ChatSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [mood, setMood] = useState([5]); // Initial mood value
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: format(new Date(), "h:mm a"),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I understand how you're feeling. Would you like to explore why you might be feeling this way?",
        "That's interesting. Can you tell me more about what triggered these emotions?",
        "Thank you for sharing. How long have you been feeling this way?",
        "I appreciate your openness. What do you think would help you feel better right now?",
        "I'm here to support you. Would it help to discuss some coping strategies that might work for this situation?"
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        content: randomResponse,
        sender: "ai",
        timestamp: format(new Date(), "h:mm a"),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleMoodChange = (value: number[]) => {
    setMood(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <header className="bg-white shadow-soft">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="font-medium">
            Session: {format(new Date(), "MMMM d, yyyy")}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500"
            onClick={() => navigate("/dashboard")}
          >
            End Session
          </Button>
        </div>
      </header>
      
      <div className="flex-grow flex flex-col md:flex-row max-w-6xl mx-auto w-full px-6 py-4">
        <div className="flex-grow flex flex-col mb-4 md:mb-0 md:mr-4">
          <div className="flex-grow bg-white rounded-2xl shadow-soft p-4 overflow-y-auto">
            <div className="flex flex-col">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.content}
                  sender={message.sender as "user" | "ai"}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </Button>
          </form>
        </div>
        
        <div className="w-full md:w-64">
          <MoodSlider value={mood} onChange={handleMoodChange} />
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
