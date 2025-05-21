
import React from "react";
import { Slider } from "@/components/ui/slider";

interface MoodSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const MoodSlider = ({ value, onChange }: MoodSliderProps) => {
  const getMoodColor = (value: number) => {
    if (value <= 3) return "#F5A623";
    if (value >= 7) return "#4A90E2";
    return "#8A9BAE";
  };

  const getMoodEmoji = (value: number) => {
    if (value <= 2) return "😢";
    if (value <= 4) return "😕";
    if (value <= 6) return "😐";
    if (value <= 8) return "🙂";
    return "😁";
  };

  const getMoodText = (value: number) => {
    if (value <= 2) return "Very Low";
    if (value <= 4) return "Low";
    if (value <= 6) return "Neutral";
    if (value <= 8) return "Good";
    return "Excellent";
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-soft">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium">Current Mood</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium" style={{ color: getMoodColor(value[0]) }}>
            {getMoodEmoji(value[0])}
          </span>
          <span className="text-lg font-medium" style={{ color: getMoodColor(value[0]) }}>
            {value[0]}/10
          </span>
        </div>
      </div>
      
      <Slider
        value={value}
        min={0}
        max={10}
        step={1}
        onValueChange={onChange}
        className="my-6"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>{getMoodText(value[0])}</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default MoodSlider;
