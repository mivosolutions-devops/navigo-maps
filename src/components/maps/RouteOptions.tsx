"use client";

import { Route } from "@/types/map";

interface RouteOptionsProps {
  routes: Route[];
  activeRouteIndex: number;
  onRouteSelect: (index: number) => void;
}

export function RouteOptions({
  routes,
  activeRouteIndex,
  onRouteSelect,
}: RouteOptionsProps) {
  if (routes.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-medium text-gray-600 mb-2">Routes</div>
      {routes.map((route, index) => {
        const distanceKm = (route.distance / 1000).toFixed(1);
        const durationMin = Math.round(route.duration / 60);
        const isActive = index === activeRouteIndex;

        return (
          <button
            key={index}
            onClick={() => onRouteSelect(index)}
            className={`w-full text-left bg-white rounded-md shadow-sm border p-2.5 transition-all hover:shadow ${
              isActive 
                ? "border-blue-400 bg-blue-50" 
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <div className={`text-sm font-semibold ${isActive ? "text-blue-700" : "text-gray-900"}`}>
                {durationMin} min
              </div>
              {index === 0 && (
                <div className="bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Best
                </div>
              )}
            </div>
            <div className="text-[11px] text-gray-500">{distanceKm} km</div>
          </button>
        );
      })}
    </div>
  );
}
