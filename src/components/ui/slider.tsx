import * as React from "react";

interface SliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
}

export function Slider({ value, min = 0, max = 100, step = 1, onValueChange, className }: SliderProps) {
  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className || ""}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange?.([parseFloat(e.target.value)])}
        className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
      />
    </div>
  );
}
