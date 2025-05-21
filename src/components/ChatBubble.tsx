
import React from "react";
import { cn } from "@/lib/utils";
import { CircleDot } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "ai";
  timestamp: string;
  sentimentScore?: number; // Optional PHQ-9 related sentiment score
}

const ChatBubble = ({ message, sender, timestamp, sentimentScore }: ChatBubbleProps) => {
  // Function to get color based on sentiment score (PHQ-9 scale)
  const getSentimentColor = (score?: number) => {
    if (score === undefined) return "transparent";
    if (score <= 4) return "#4A90E2"; // Minimal depression - blue
    if (score <= 9) return "#8A9BAE"; // Mild depression - neutral
    if (score <= 14) return "#F5A623"; // Moderate depression - amber
    if (score <= 19) return "#F97316"; // Moderately severe - orange
    return "#ea384c"; // Severe depression - red
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] mb-4",
        sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-2",
          sender === "user"
            ? "bg-primary text-white"
            : "bg-neutral-light shadow-soft"
        )}
      >
        {message}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-400">{timestamp}</span>
        {sender === "user" && sentimentScore !== undefined && (
          <div 
            className="flex items-center" 
            title={`Detected sentiment level: ${sentimentScore}/27`}
          >
            <CircleDot 
              size={12} 
              className="opacity-70"
              style={{ color: getSentimentColor(sentimentScore) }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
