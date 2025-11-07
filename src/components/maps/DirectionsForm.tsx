"use client";

import { Circle, Menu } from "lucide-react";

interface DirectionsFormProps {
  origin: string;
  destination: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onGetDirections: () => void;
}

export function DirectionsForm({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onGetDirections,
}: DirectionsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">
      <div className="space-y-2">
        {/* Origin Input */}
        <div className="flex items-center bg-gray-50 rounded-md p-2 border border-gray-200 focus-within:border-blue-400 transition-colors">
          <Circle className="w-2.5 h-2.5 fill-blue-600 text-blue-600 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={origin}
            onChange={(e) => onOriginChange(e.target.value)}
            placeholder="Choose starting point"
            className="flex-1 bg-transparent border-none outline-none text-xs"
          />
          <Menu className="w-3.5 h-3.5 text-gray-400 ml-1 cursor-move" />
        </div>

        {/* Destination Input */}
        <div className="flex items-center bg-gray-50 rounded-md p-2 border border-gray-200 focus-within:border-blue-400 transition-colors">
          <Circle className="w-2.5 h-2.5 fill-red-600 text-red-600 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="Choose destination"
            className="flex-1 bg-transparent border-none outline-none text-xs"
          />
          <Menu className="w-3.5 h-3.5 text-gray-400 ml-1 cursor-move" />
        </div>

        {/* Get Directions Button */}
        <button
          onClick={onGetDirections}
          disabled={!origin || !destination}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors shadow-sm text-xs"
        >
          Get Directions
        </button>
      </div>
    </div>
  );
}

