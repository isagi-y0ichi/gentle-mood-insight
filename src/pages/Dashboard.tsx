
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SessionHistoryCard from "@/components/SessionHistoryCard";
import { useNavigate } from "react-router-dom";

// Mock data for the weekly mood chart
const weeklyMoodData = [
  { day: "Mon", score: 7 },
  { day: "Tue", score: 5 },
  { day: "Wed", score: 8 },
  { day: "Thu", score: 6 },
  { day: "Fri", score: 4 },
  { day: "Sat", score: 7 },
  { day: "Sun", score: 9 },
];

// Mock data for past sessions
const pastSessions = [
  { id: "1", date: new Date(2025, 4, 20, 14, 30), moodScore: 7 },
  { id: "2", date: new Date(2025, 4, 18, 10, 15), moodScore: 5 },
  { id: "3", date: new Date(2025, 4, 15, 16, 45), moodScore: 8 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  const getMoodColor = (score: number) => {
    if (score <= 3) return "#F5A623";
    if (score >= 7) return "#4A90E2";
    return "#8A9BAE";
  };

  const startNewSession = () => {
    navigate("/chat/new");
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <header className="bg-white shadow-soft">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
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
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={() => navigate("/settings")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Button>
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Welcome, {userName}</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Weekly Mood Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between pt-6">
                  {weeklyMoodData.map((day, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        style={{ 
                          height: `${day.score * 10}%`,
                          backgroundColor: getMoodColor(day.score),
                        }}
                        className="w-8 rounded-t-lg"
                      />
                      <span className="text-sm mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={startNewSession}
              className="bg-primary hover:bg-primary/90 rounded-2xl w-full py-6 text-lg mb-6"
            >
              Start New Session
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
            <div className="space-y-4">
              {pastSessions.map((session) => (
                <SessionHistoryCard
                  key={session.id}
                  id={session.id}
                  date={session.date}
                  moodScore={session.moodScore}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
