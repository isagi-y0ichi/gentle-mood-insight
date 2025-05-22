
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";
import { ArrowRight } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const reset = useChatStore((state) => state.reset);
  
  const handleStartChat = () => {
    reset(); // Reset any previous chat state
    navigate("/chat");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="mx-auto w-40 h-40 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" fill="#4A90E2" />
            <path d="M12 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" fill="#4A90E2" />
            <path d="M15.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" fill="#4A90E2" />
          </svg>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Mind<span className="text-primary">Chat</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          Talk freely with our AI companion to support your emotional well-being
        </p>
        
        <div className="mt-8 space-y-6">
          <p className="text-gray-600">
            Our AI learns from your conversation patterns to provide personalized support,
            with no direct questions or assessments — just natural conversation.
          </p>
          
          <Button 
            onClick={handleStartChat} 
            size="lg" 
            className="rounded-full px-8 py-6 text-lg"
          >
            Start Chatting <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
