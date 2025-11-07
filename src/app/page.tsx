"use client";

import { useState, useCallback, useEffect } from "react";
import { MapContainer } from "@/components/maps/MapContainer";
import { MapSidebar } from "@/components/maps/MapSidebar";
import { MapControls } from "@/components/maps/MapControls";
import { TravelMode, Route, Location } from "@/types/map";
import { calculateRoutes } from "@/lib/map-utils";

export default function Home() {
  const [travelMode, setTravelMode] = useState<TravelMode>("driving");
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [isTilted, setIsTilted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-calculate routes when both origin and destination are set
  useEffect(() => {
    const fetchRoutes = async () => {
      if (!origin || !destination) {
        // Clear routes if either origin or destination is missing
        setRoutes([]);
        return;
      }

      console.log("🎯 Triggering route calculation...", {
        origin,
        destination,
        travelMode
      });

      try {
        const calculatedRoutes = await calculateRoutes(
          origin,
          destination,
          travelMode
        );

        if (calculatedRoutes && calculatedRoutes.length > 0) {
          console.log(
            `✅ Successfully calculated ${calculatedRoutes.length} route(s)`
          );
          setRoutes(calculatedRoutes);
          setActiveRouteIndex(0);
        } else {
          console.warn("⚠️ No routes returned from calculateRoutes");
          setRoutes([]);
        }
      } catch (error) {
        console.error("❌ Error in route calculation:", error);
        setRoutes([]);
      }
    };

    // Add a small delay to ensure markers are placed before calculating routes
    const timeoutId = setTimeout(() => {
      fetchRoutes();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [origin, destination, travelMode]);

  const handleGetDirections = useCallback(async () => {
    if (!origin || !destination) return;

    const calculatedRoutes = await calculateRoutes(
      origin,
      destination,
      travelMode
    );
    if (calculatedRoutes) {
      setRoutes(calculatedRoutes);
      setActiveRouteIndex(0);
    }
  }, [origin, destination, travelMode]);

  const handleOriginChange = useCallback((coords: [number, number]) => {
    setOrigin(coords);
    setOriginText(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
  }, []);

  const handleDestinationChange = useCallback((coords: [number, number]) => {
    setDestination(coords);
    setDestinationText(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
    // Route calculation will be triggered automatically by the useEffect
  }, []);

  const handleLocationSelect = useCallback(
    (location: Location) => {
      if (!origin) {
        setOrigin(location.coords);
        setOriginText(location.name);
      } else if (!destination) {
        setDestination(location.coords);
        setDestinationText(location.name);

        // Auto-calculate routes
        calculateRoutes(origin, location.coords, travelMode).then(
          (calculatedRoutes) => {
            if (calculatedRoutes) {
              setRoutes(calculatedRoutes);
              setActiveRouteIndex(0);
            }
          }
        );
      }
    },
    [origin, destination, travelMode]
  );

  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          const coords: [number, number] = [longitude, latitude];
          setOrigin(coords);
          setOriginText("My Location");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Could not get your location. Please allow location access or enter your location manually."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleToggleTilt = useCallback(() => {
    setIsTilted((prev) => !prev);
  }, []);

  const handleTravelModeChange = useCallback(
    (mode: TravelMode) => {
      setTravelMode(mode);

      // Recalculate routes if both points are set
      if (origin && destination) {
        calculateRoutes(origin, destination, mode).then((calculatedRoutes) => {
          if (calculatedRoutes) {
            setRoutes(calculatedRoutes);
            setActiveRouteIndex(0);
          }
        });
      }
    },
    [origin, destination]
  );

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <MapSidebar
        travelMode={travelMode}
        origin={originText}
        destination={destinationText}
        routes={routes}
        activeRouteIndex={activeRouteIndex}
        onTravelModeChange={handleTravelModeChange}
        onOriginChange={setOriginText}
        onDestinationChange={setDestinationText}
        onGetDirections={handleGetDirections}
        onRouteSelect={setActiveRouteIndex}
        onLocationSelect={handleLocationSelect}
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
      />

      <div className='flex-1 relative'>
        <MapContainer
          origin={origin}
          destination={destination}
          routes={routes}
          activeRouteIndex={activeRouteIndex}
          travelMode={travelMode}
          isTilted={isTilted}
          onOriginChange={handleOriginChange}
          onDestinationChange={handleDestinationChange}
        />

        <MapControls
          onLocate={handleLocate}
          onToggleTilt={handleToggleTilt}
          isTilted={isTilted}
        />
      </div>
    </div>
  );
}
