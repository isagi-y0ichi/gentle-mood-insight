
import React, { useEffect, useRef } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import Loader from "@/components/Loader";
import PhqAssessmentCard from "@/components/PhqAssessmentCard";
import { useChatStore } from "@/store/chatStore";

const ChatWindow: React.FC = () => {
  const {
    messages,
    loading,
    error,
    sendMessage,
    totalPhq9Score,
    phq9Assessment
  } = useChatStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              sender={message.sender}
              timestamp={message.timestamp || ""}
              sentimentScore={message.sentimentScore}
            />
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-neutral-100 rounded-2xl shadow-soft p-4 max-w-[75%]">
                <Loader />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Show PHQ assessment only if messages exist */}
        {messages.length > 1 && (
          <PhqAssessmentCard 
            totalScore={totalPhq9Score}
            assessment={phq9Assessment}
          />
        )}
        
        {/* Error message if any */}
        {error && (
          <div className="p-2 text-sm text-red-500 rounded-lg bg-red-50 mb-2">
            {error}
          </div>
        )}
        
        <ChatInput onSendMessage={sendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default ChatWindow;
