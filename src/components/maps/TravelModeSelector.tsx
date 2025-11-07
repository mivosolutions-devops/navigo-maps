"use client";

import { TravelMode } from "@/types/map";
import { Car, PersonStanding, Bike } from "lucide-react";

interface TravelModeSelectorProps {
  selectedMode: TravelMode;
  onModeChange: (mode: TravelMode) => void;
}

export function TravelModeSelector({
  selectedMode,
  onModeChange,
}: TravelModeSelectorProps) {
  const modes: { mode: TravelMode; label: string; icon: React.ReactNode }[] = [
    {
      mode: "driving",
      label: "Drive",
      icon: <Car className="w-4 h-4" />,
    },
    {
      mode: "walking",
      label: "Walk",
      icon: <PersonStanding className="w-4 h-4" />,
    },
    {
      mode: "cycling",
      label: "Bike",
      icon: <Bike className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex gap-1.5">
      {modes.map(({ mode, label, icon }) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`flex flex-col items-center justify-center flex-1 py-2 px-2 rounded-lg transition-all ${
            selectedMode === mode
              ? "bg-blue-50 text-blue-600 border border-blue-400"
              : "hover:bg-gray-50 text-gray-600 border border-gray-200"
          }`}
        >
          {icon}
          <span className="text-[10px] font-medium mt-0.5">{label}</span>
        </button>
      ))}
    </div>
  );
}
