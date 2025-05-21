
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import ChatBubble from "@/components/ChatBubble";
import MoodSlider from "@/components/MoodSlider";
import { format } from "date-fns";

// PHQ-9 tracking categories
const phq9Categories = [
  "interest/pleasure", // Little interest or pleasure in doing things
  "depressed", // Feeling down, depressed, or hopeless
  "sleep", // Trouble falling/staying asleep, or sleeping too much
  "fatigue", // Feeling tired or having little energy
  "appetite", // Poor appetite or overeating
  "self-esteem", // Feeling bad about yourself
  "concentration", // Trouble concentrating
  "psychomotor", // Moving or speaking slowly/restlessly
  "suicidal" // Thoughts of self-harm
];

// Keywords that might indicate PHQ-9 categories
const phq9Keywords = {
  "interest/pleasure": ["boring", "don't enjoy", "nothing fun", "no interest", "not interested", "don't care", "apathy"],
  "depressed": ["sad", "down", "depressed", "hopeless", "empty", "unhappy", "miserable", "terrible"],
  "sleep": ["insomnia", "can't sleep", "sleeping too much", "tired", "exhausted", "awake", "nightmare"],
  "fatigue": ["tired", "exhausted", "no energy", "fatigue", "drained", "lethargic", "can't focus"],
  "appetite": ["not eating", "eating too much", "no appetite", "weight", "food", "hungry", "overeating"],
  "self-esteem": ["failure", "disappointed", "letting down", "worthless", "guilt", "blame", "hate myself"],
  "concentration": ["can't focus", "distracted", "hard to concentrate", "focus", "mind wanders", "scattered"],
  "psychomotor": ["slow", "restless", "agitated", "fidgety", "can't sit still", "moving slowly"],
  "suicidal": ["better off dead", "harm myself", "suicidal", "end it all", "not worth living", "no point"]
};

// Type for PHQ-9 scores
type Phq9ScoresType = Record<string, number>;

// Type for messages
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  sentimentScore?: number;
}

// Mock conversation starter
const initialMessages: Message[] = [
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
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [mood, setMood] = useState<number[]>([5]); // Initial mood value
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // PHQ-9 assessment state (0-3 for each of 9 categories, total score 0-27)
  const [phq9Scores, setPhq9Scores] = useState<Phq9ScoresType>(
    Object.fromEntries(phq9Categories.map(cat => [cat, 0]))
  );
  const [totalPhq9Score, setTotalPhq9Score] = useState(0);
  const [phq9Level, setPhq9Level] = useState("");
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Calculate total PHQ-9 score and classification
  useEffect(() => {
    const total = Object.values(phq9Scores).reduce((sum, score) => sum + score, 0);
    setTotalPhq9Score(total);
    
    // PHQ-9 score interpretation
    if (total <= 4) setPhq9Level("Minimal depression");
    else if (total <= 9) setPhq9Level("Mild depression");
    else if (total <= 14) setPhq9Level("Moderate depression");
    else if (total <= 19) setPhq9Level("Moderately severe depression");
    else setPhq9Level("Severe depression");
  }, [phq9Scores]);

  // Analyze text for PHQ-9 indicators
  const analyzeText = (text: string) => {
    const lowercaseText = text.toLowerCase();
    const newScores = { ...phq9Scores };
    let hasUpdated = false;
    
    // Check for keywords in each category
    Object.entries(phq9Keywords).forEach(([category, keywords]) => {
      keywords.forEach(keyword => {
        if (lowercaseText.includes(keyword)) {
          // Increase score if keyword found (max 3 per category)
          const currentCatScore = newScores[category as keyof typeof newScores];
          if (currentCatScore < 3) {
            newScores[category as keyof typeof newScores] = currentCatScore + 1;
            hasUpdated = true;
          }
        }
      });
    });
    
    // Update scores if changes were made
    if (hasUpdated) {
      setPhq9Scores(newScores);
    }
    
    return Object.values(newScores).reduce((sum, score) => sum + score, 0);
  };

  // Generate AI response based on context and PHQ-9 assessment
  const generateAIResponse = (userMessage: string, currentScore: number) => {
    // Base responses adjusted for different PHQ-9 levels
    const baseResponses = [
      "I notice you're sharing some positive experiences. Would you like to talk more about what's going well?",
      "Thank you for sharing. How long have you been feeling this way?",
      "I'm here to support you. Can you tell me more about when these feelings started?",
      "That sounds challenging. Have you noticed any patterns or triggers for these feelings?",
      "I appreciate your openness. What kind of support do you feel would be most helpful right now?"
    ];
    
    // Add PHQ-9 specific follow-ups based on detected categories
    const highestCategories = Object.entries(phq9Scores)
      .filter(([_, score]) => score >= 2) // Categories scoring 2 or higher
      .map(([cat, _]) => cat);
    
    const followUps = {
      "interest/pleasure": "Have you noticed activities that still bring you some enjoyment, even if small?",
      "depressed": "When you're feeling down, what has helped you cope in the past?",
      "sleep": "How has your sleep pattern changed recently?",
      "fatigue": "Are there particular times of day when your energy feels better?",
      "appetite": "Has your relationship with food changed lately?",
      "self-esteem": "I hear some self-critical thoughts. Would you be as hard on a friend facing similar challenges?",
      "concentration": "Have you found any strategies that help you focus, even briefly?",
      "psychomotor": "Have others commented on changes in your activity level or way of speaking?",
      "suicidal": "I'm concerned about what you've shared. Please consider reaching out to a mental health professional or crisis service. Would you like information about available resources?"
    };
    
    // Select appropriate response based on PHQ-9 score
    let response = "";
    
    // If high suicidal score, prioritize that response
    if (phq9Scores["suicidal"] >= 2) {
      response = "I'm concerned about what you've shared. Please consider reaching out to a mental health professional or crisis service. Would you like information about available resources?";
    } 
    // If we've detected a high score in any category, use a targeted follow-up
    else if (highestCategories.length > 0) {
      const randomCategory = highestCategories[Math.floor(Math.random() * highestCategories.length)];
      response = followUps[randomCategory as keyof typeof followUps];
    } 
    // Otherwise use a base response
    else {
      response = baseResponses[Math.floor(Math.random() * baseResponses.length)];
    }
    
    return response;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Analyze message for PHQ-9 indicators
    const currentScore = analyzeText(inputValue);
    
    // Add user message with sentiment score
    const userMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user" as const,
      timestamp: format(new Date(), "h:mm a"),
      sentimentScore: currentScore, // Add the PHQ-9 score to the message
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Generate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, currentScore);
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: "ai" as const,
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
                  sender={message.sender}
                  timestamp={message.timestamp}
                  sentimentScore={message.sentimentScore}
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
        
        <div className="w-full md:w-64 space-y-4">
          <MoodSlider value={mood} onChange={handleMoodChange} />
          
          {/* PHQ-9 Assessment Card */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-soft">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">PHQ-9 Assessment</span>
              <span className="text-xs font-medium px-2 py-1 rounded-full" 
                style={{ 
                  backgroundColor: totalPhq9Score <= 4 ? '#4A90E220' : 
                                totalPhq9Score <= 9 ? '#8A9BAE20' : 
                                totalPhq9Score <= 14 ? '#F5A62320' : 
                                totalPhq9Score <= 19 ? '#F9731620' : '#ea384c20',
                  color: totalPhq9Score <= 4 ? '#4A90E2' : 
                         totalPhq9Score <= 9 ? '#8A9BAE' : 
                         totalPhq9Score <= 14 ? '#F5A623' : 
                         totalPhq9Score <= 19 ? '#F97316' : '#ea384c'
                }}>
                {phq9Level}
              </span>
            </div>
            
            <Progress
              value={(totalPhq9Score / 27) * 100}
              className="h-2 mb-1"
              // Fixing this style object to use valid CSS properties
              style={{ 
                backgroundColor: '#e5e7eb'
              }}
            />
            
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>0</span>
              <span>{totalPhq9Score}/27</span>
            </div>
            
            <div className="text-xs text-gray-500">
              Based on conversation analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;

