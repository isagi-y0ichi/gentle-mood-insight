
import React from "react";
import LandingNavbar from "@/components/ui/LandingNavbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <Hero />
      
      <section id="features" className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            <FeatureCard
              title="AI-Driven Chat"
              description="Engage in meaningful conversations with our intelligent chat assistant designed to help you process emotions and thoughts."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A90E2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
            />
            
            <FeatureCard
              title="Custom Diagnostic Scale"
              description="Track your mental wellbeing with our customizable mood scale that helps identify patterns and triggers."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A90E2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                  <path d="m12 2-2.5 2.5" />
                  <path d="m12 2 2.5 2.5" />
                  <path d="m12 22-2.5-2.5" />
                  <path d="m12 22 2.5-2.5" />
                  <path d="m2 12 2.5 2.5" />
                  <path d="m2 12 2.5-2.5" />
                  <path d="m22 12-2.5 2.5" />
                  <path d="m22 12-2.5-2.5" />
                </svg>
              }
            />
            
            <FeatureCard
              title="Session History"
              description="Review past sessions to track your progress over time and gain insights into your emotional journey."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A90E2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
      
      <footer className="bg-neutral-light py-10 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="font-bold text-lg">MindChat</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MindChat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
