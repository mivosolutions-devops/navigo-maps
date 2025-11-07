"use client";

import { Locate } from "lucide-react";

interface MapControlsProps {
  onLocate: () => void;
  onToggleTilt: () => void;
  isTilted: boolean;
}

export function MapControls({
  onLocate,
  onToggleTilt,
  isTilted
}: MapControlsProps) {
  return (
    <div className='fixed right-4 bottom-7 md:right-5 md:bottom-10 flex flex-col gap-2 z-10'>
      {/* Tilt Button */}
      <button
        onClick={onToggleTilt}
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all ${
          isTilted
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-white text-blue-600 hover:bg-gray-50"
        }`}
        title={isTilted ? "Switch to 2D" : "Switch to 3D"}
      >
        <span className='text-[10px] font-bold'>{isTilted ? "3D" : "2D"}</span>
      </button>

      {/* My Location Button */}
      <button
        onClick={onLocate}
        className='w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition-all hover:shadow-lg'
        title='My location'
      >
        <Locate className='w-5 h-5 text-blue-600' />
      </button>
    </div>
  );
}
