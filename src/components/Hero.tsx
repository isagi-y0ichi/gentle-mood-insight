
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignUpModal from "./SignUpModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup">("signup");

  const openSignupModal = () => {
    setModalType("signup");
    setIsModalOpen(true);
  };

  const openLearnMore = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-16 lg:py-24 px-6 lg:px-12 bg-neutral-light">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-dark">
            Your Personal <span className="text-primary">Mental-Health</span> Companion
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Navigate your emotions with an AI-driven chat experience that helps you understand and improve your mental wellbeing.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button 
              onClick={openSignupModal}
              className="bg-primary hover:bg-primary/90 rounded-2xl px-6 py-5 text-lg"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              onClick={openLearnMore}
              className="rounded-2xl px-6 py-5 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="w-full h-64 lg:h-96 relative overflow-hidden rounded-2xl">
            <svg 
              viewBox="0 0 500 400" 
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M30,196.5C37.2,151.5,90.5,61.5,174.2,70.8C257.8,80.2,289.7,195.3,353.7,190.8C417.8,186.4,410.8,106.5,470.5,101.7" 
                fill="none" 
                stroke="#4A90E2" 
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="120" cy="200" r="50" fill="#F5A623" opacity="0.5" />
              <circle cx="350" cy="150" r="70" fill="#4A90E2" opacity="0.3" />
              <circle cx="200" cy="270" r="40" fill="#4A90E2" opacity="0.5" />
              
              {/* Person 1 */}
              <circle cx="120" cy="200" r="20" fill="#F7F9FA" stroke="#333" strokeWidth="1.5" />
              <circle cx="112" cy="195" r="3" fill="#333" /> 
              <circle cx="128" cy="195" r="3" fill="#333" />
              <path d="M112,210 Q120,215 128,210" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Person 2 */}
              <circle cx="350" cy="150" r="20" fill="#F7F9FA" stroke="#333" strokeWidth="1.5" />
              <circle cx="342" cy="145" r="3" fill="#333" /> 
              <circle cx="358" cy="145" r="3" fill="#333" />
              <path d="M342,160 Q350,165 358,160" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Person 3 */}
              <circle cx="200" cy="270" r="20" fill="#F7F9FA" stroke="#333" strokeWidth="1.5" />
              <circle cx="192" cy="265" r="3" fill="#333" /> 
              <circle cx="208" cy="265" r="3" fill="#333" />
              <path d="M192,280 Q200,285 208,280" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Speech bubbles */}
              <path d="M150,180 Q155,170 165,170 L200,170 Q210,170 215,180 L215,200 Q215,210 205,210 L175,210 L165,220 L165,210 L165,210 Q155,210 150,200 Z" fill="#F7F9FA" stroke="#4A90E2" strokeWidth="1.5" />
              <path d="M300,130 Q295,120 285,120 L250,120 Q240,120 235,130 L235,150 Q235,160 245,160 L275,160 L285,170 L285,160 L285,160 Q295,160 300,150 Z" fill="#F7F9FA" stroke="#4A90E2" strokeWidth="1.5" />
              <path d="M230,250 Q235,240 245,240 L280,240 Q290,240 295,250 L295,270 Q295,280 285,280 L255,280 L245,290 L245,280 L245,280 Q235,280 230,270 Z" fill="#F7F9FA" stroke="#4A90E2" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SignUpModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialView={modalType}
        />
      )}
    </div>
  );
};

export default Hero;
