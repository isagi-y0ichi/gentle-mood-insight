
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    onSendMessage(trimmedMessage);
    setMessage("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-md"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How are you feeling today?"
        disabled={disabled}
        className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={disabled || !message.trim()}
        className="rounded-full h-10 w-10 flex items-center justify-center"
      >
        <ArrowUpCircle size={24} />
      </Button>
    </form>
  );
};

export default ChatInput;
