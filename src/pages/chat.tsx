
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChatWindow from "@/components/ChatWindow";
import { ArrowLeft } from "lucide-react";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="border-b p-4 bg-white flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          MindChat
        </h1>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
