
import { create } from "zustand";
import { ChatMessage, Phq9ScoresType, Phq9Category } from "@/types/chat";
import { sendChat, mockSendChat } from "@/lib/api";
import { format } from "date-fns";

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  phq9Scores: Phq9ScoresType;
  totalPhq9Score: number;
  phq9Assessment: string;
  
  // Actions
  addMessage: (msg: ChatMessage) => void;
  sendMessage: (text: string) => Promise<void>;
  reset: () => void;
  updatePhq9Score: (category: Phq9Category, score: number) => void;
}

// PHQ-9 keywords for each category
const phq9Keywords: Record<string, string[]> = {
  "interest": ["no interest", "don't enjoy", "no pleasure", "nothing excites", "don't care", "apathy"],
  "depressed": ["depressed", "hopeless", "sad", "empty", "tearful", "worthless"],
  "sleep": ["trouble sleeping", "insomnia", "sleep too much", "can't sleep", "nightmares", "tired"],
  "fatigue": ["tired", "no energy", "fatigue", "exhausted", "can't do anything", "drained"],
  "appetite": ["poor appetite", "overeating", "weight loss", "weight gain", "no hunger", "don't eat"],
  "failure": ["failure", "disappointment", "let down", "guilty", "ashamed", "blame myself"],
  "concentration": ["can't focus", "hard to concentrate", "difficulty thinking", "can't decide", "forgetful", "distracted"],
  "psychomotor": ["fidgety", "restless", "slow", "sluggish", "agitated", "can't sit still"],
  "suicidal": ["better off dead", "harm myself", "suicidal", "end it all", "not worth living", "no point"]
};

// Initial state for PHQ-9 scores
const initialPhq9Scores: Phq9ScoresType = {
  "interest": 0,
  "depressed": 0,
  "sleep": 0,
  "fatigue": 0,
  "appetite": 0,
  "failure": 0,
  "concentration": 0,
  "psychomotor": 0,
  "suicidal": 0
};

// Function to analyze text for PHQ-9 indicators
function analyzeTextForPhq9(text: string, currentScores: Phq9ScoresType): Phq9ScoresType {
  const normalizedText = text.toLowerCase();
  const newScores = { ...currentScores };
  
  Object.entries(phq9Keywords).forEach(([category, keywords]) => {
    // Check if any keywords match
    const matchingKeywords = keywords.filter(keyword => normalizedText.includes(keyword));
    
    if (matchingKeywords.length > 0) {
      // Increase score based on number of matching keywords (max 3)
      const currentScore = newScores[category as Phq9Category] || 0;
      const newScore = Math.min(3, currentScore + matchingKeywords.length * 0.5);
      newScores[category as Phq9Category] = newScore;
    }
  });
  
  return newScores;
}

// Function to calculate total PHQ-9 score
function calculateTotalPhq9Score(scores: Phq9ScoresType): number {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}

// Function to get PHQ-9 assessment based on total score
function getPhq9Assessment(totalScore: number): string {
  if (totalScore <= 4) return "Minimal depression";
  if (totalScore <= 9) return "Mild depression";
  if (totalScore <= 14) return "Moderate depression";
  if (totalScore <= 19) return "Moderately severe depression";
  return "Severe depression";
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  loading: false,
  error: null,
  phq9Scores: initialPhq9Scores,
  totalPhq9Score: 0,
  phq9Assessment: "Minimal depression",
  
  addMessage: (msg) => set((state) => ({ 
    messages: [...state.messages, {
      ...msg,
      id: msg.id || `${msg.sender}-${Date.now()}`,
      timestamp: msg.timestamp || format(new Date(), "h:mm a")
    }] 
  })),
  
  sendMessage: async (text) => {
    const { messages, addMessage, phq9Scores } = get();
    
    // Create user message
    const userMessage: ChatMessage = { 
      sender: "user", 
      message: text,
    };
    
    // Add user message to state
    addMessage(userMessage);
    
    // Set loading state
    set({ loading: true, error: null });
    
    try {
      // Analyze message for PHQ-9 indicators
      const updatedScores = analyzeTextForPhq9(text, phq9Scores);
      const totalScore = calculateTotalPhq9Score(updatedScores);
      const assessment = getPhq9Assessment(totalScore);
      
      // Update PHQ-9 scores
      set({ 
        phq9Scores: updatedScores,
        totalPhq9Score: totalScore,
        phq9Assessment: assessment
      });
      
      // Send message to API (using mock for development)
      const { reply, sentimentAnalysis } = await mockSendChat([...messages, userMessage]);
      
      // Add AI response to state
      addMessage({ 
        sender: "ai", 
        message: reply,
        sentimentScore: sentimentAnalysis?.score
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "An error occurred";
      set({ error: errorMsg });
      
      // Add error message as AI response
      addMessage({ 
        sender: "ai", 
        message: "Sorry, I encountered an error. Please try again." 
      });
    } finally {
      set({ loading: false });
    }
  },
  
  reset: () => set({ 
    messages: [], 
    loading: false, 
    error: null,
    phq9Scores: initialPhq9Scores,
    totalPhq9Score: 0,
    phq9Assessment: "Minimal depression"
  }),
  
  updatePhq9Score: (category, score) => set((state) => {
    const updatedScores = { 
      ...state.phq9Scores,
      [category]: score 
    };
    const totalScore = calculateTotalPhq9Score(updatedScores);
    
    return {
      phq9Scores: updatedScores,
      totalPhq9Score: totalScore,
      phq9Assessment: getPhq9Assessment(totalScore)
    };
  })
}));
