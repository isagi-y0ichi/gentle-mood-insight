
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SessionHistoryCardProps {
  id: string;
  date: Date;
  moodScore: number;
}

const SessionHistoryCard = ({ id, date, moodScore }: SessionHistoryCardProps) => {
  const navigate = useNavigate();

  const getMoodColor = (score: number) => {
    if (score <= 3) return "#F5A623";
    if (score >= 7) return "#4A90E2";
    return "#8A9BAE";
  };

  return (
    <Card className="card mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Session: {format(date, "MMMM d, yyyy")}
        </CardTitle>
        <div className="text-sm text-gray-500">
          {format(date, "h:mm a")}
        </div>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: `${getMoodColor(moodScore)}20`,
              color: getMoodColor(moodScore)
            }}
          >
            <span className="font-bold">{moodScore}</span>
          </div>
          <span className="text-sm text-gray-600">Mood Score</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/chat/${id}`)}
          className="rounded-xl"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SessionHistoryCard;
