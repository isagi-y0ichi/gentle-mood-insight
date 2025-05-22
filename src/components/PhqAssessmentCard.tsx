
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PhqAssessmentCardProps {
  totalScore: number;
  assessment: string;
}

const PhqAssessmentCard: React.FC<PhqAssessmentCardProps> = ({
  totalScore,
  assessment,
}) => {
  // Get appropriate color based on PHQ-9 score
  const getScoreColor = () => {
    if (totalScore <= 4) return "bg-green-500";
    if (totalScore <= 9) return "bg-blue-500";
    if (totalScore <= 14) return "bg-yellow-500";
    if (totalScore <= 19) return "bg-orange-500";
    return "bg-red-500";
  };

  // Calculate percentage of max score (27)
  const scorePercentage = (totalScore / 27) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Current Assessment</span>
          <span className="text-sm font-normal text-muted-foreground">
            PHQ-9 Score: {totalScore}/27
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={scorePercentage} 
          className="h-2 mb-2" 
          indicatorClassName={getScoreColor()}
        />
        <p className="text-base font-medium">{assessment}</p>
        <p className="text-sm text-muted-foreground mt-1">
          This assessment is inferred from your conversation and updates in real-time.
        </p>
      </CardContent>
    </Card>
  );
};

export default PhqAssessmentCard;
