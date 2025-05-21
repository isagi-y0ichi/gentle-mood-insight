
import React from "react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "ai";
  timestamp: string;
}

const ChatBubble = ({ message, sender, timestamp }: ChatBubbleProps) => {
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
      <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
    </div>
  );
};

export default ChatBubble;
