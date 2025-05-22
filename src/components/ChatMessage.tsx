
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
  timestamp: string;
  sentimentScore?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
  sentimentScore
}) => {
  const isUser = sender === "user";
  
  // Determine color based on sentiment score (if available)
  const getSentimentColor = () => {
    if (sentimentScore === undefined) return "bg-neutral-100";
    if (sentimentScore < 3) return "bg-red-50 border-l-4 border-red-300";
    if (sentimentScore < 5) return "bg-orange-50 border-l-4 border-orange-300";
    if (sentimentScore < 7) return "bg-blue-50 border-l-4 border-blue-300";
    return "bg-green-50 border-l-4 border-green-300";
  };
  
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl shadow-soft p-4",
          isUser
            ? "bg-primary text-white"
            : sentimentScore !== undefined 
              ? getSentimentColor() 
              : "bg-neutral-100"
        )}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap">{message}</p>
        <div
          className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/80" : "text-gray-500"
          )}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
