"use client";

import { TravelMode, Route, Location } from "@/types/map";
import { LocationSearch } from "./LocationSearch";
import { TravelModeSelector } from "./TravelModeSelector";
import { DirectionsForm } from "./DirectionsForm";
import { RouteOptions } from "./RouteOptions";
import { Menu, X, MapPin, Star, Heart, Users, Bell, Clock } from "lucide-react";
import Image from "next/image";

interface MapSidebarProps {
  travelMode: TravelMode;
  origin: string;
  destination: string;
  routes: Route[];
  activeRouteIndex: number;
  onTravelModeChange: (mode: TravelMode) => void;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onGetDirections: () => void;
  onRouteSelect: (index: number) => void;
  onLocationSelect: (location: Location) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function MapSidebar({
  travelMode,
  origin,
  destination,
  routes,
  activeRouteIndex,
  onTravelModeChange,
  onOriginChange,
  onDestinationChange,
  onGetDirections,
  onRouteSelect,
  onLocationSelect,
  isOpen,
  onToggle
}: MapSidebarProps) {
  const showRoutes = routes.length > 0;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className='fixed top-3 left-3 z-50 lg:hidden bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors'
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className='w-5 h-5 text-gray-700' />
        ) : (
          <Menu className='w-5 h-5 text-gray-700' />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-40 bg-white shadow-xl flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isOpen ? "w-full sm:w-[340px]" : "lg:w-16 w-0"}`}
      >
        {/* Desktop Toggle Button */}
        <button
          onClick={onToggle}
          className='hidden lg:flex absolute top-3 right-4 z-10 w-8 h-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <X className='w-4 h-4 text-gray-700' />
          ) : (
            <Menu className='w-4 h-4 text-gray-700' />
          )}
        </button>

        {/* Header */}
        <div
          className={`border-b flex items-center justify-between border-gray-200 ${
            !isOpen && "lg:hidden"
          }`}
        >
          <Image
            src='/images/navigo.png'
            alt='NaviGO Maps'
            width={150}
            height={40}
          />
        </div>

        {/* Content */}
        <div className={`flex-1 ${!isOpen && "lg:hidden"}`}>
          {/* Location Search */}
          <div className='p-3 pb-0'>
            <LocationSearch onLocationSelect={onLocationSelect} />
          </div>

          {/* Travel Mode Selector */}
          <div className='px-3 pt-2'>
            <TravelModeSelector
              selectedMode={travelMode}
              onModeChange={onTravelModeChange}
            />
          </div>

          {/* Directions Form */}
          <div className='px-3 pt-2'>
            <DirectionsForm
              origin={origin}
              destination={destination}
              onOriginChange={onOriginChange}
              onDestinationChange={onDestinationChange}
              onGetDirections={onGetDirections}
            />
          </div>

          {/* Route Options */}
          {showRoutes && (
            <div className='px-3 pt-2'>
              <RouteOptions
                routes={routes}
                activeRouteIndex={activeRouteIndex}
                onRouteSelect={onRouteSelect}
              />
            </div>
          )}

          {/* Google Maps-like sections */}
          {!showRoutes && (
            <div className='mt-4'>
              {/* Recents */}
              <div className='border-t border-gray-200'>
                <div className='p-3'>
                  <div className='flex items-center gap-2 text-gray-700 mb-2'>
                    <Clock className='w-4 h-4' />
                    <h3 className='text-xs font-medium'>Recent</h3>
                  </div>
                  <div className='text-xs text-gray-500 py-4 text-center'>
                    No recent searches
                  </div>
                </div>
              </div>

              {/* Saved */}
              <div className='border-t border-gray-200'>
                <div className='p-3'>
                  <div className='flex items-center gap-2 text-gray-700 mb-2'>
                    <Star className='w-4 h-4' />
                    <h3 className='text-xs font-medium'>Saved</h3>
                  </div>
                  <div className='space-y-2'>
                    <button className='w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left'>
                      <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center'>
                        <MapPin className='w-4 h-4 text-blue-600' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='text-xs font-medium text-gray-900'>
                          Home
                        </div>
                        <div className='text-[11px] text-gray-500 truncate'>
                          Add home address
                        </div>
                      </div>
                    </button>
                    <button className='w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left'>
                      <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center'>
                        <MapPin className='w-4 h-4 text-blue-600' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='text-xs font-medium text-gray-900'>
                          Work
                        </div>
                        <div className='text-[11px] text-gray-500 truncate'>
                          Add work address
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Favorites */}
              <div className='border-t border-gray-200'>
                <div className='p-3'>
                  <div className='flex items-center gap-2 text-gray-700 mb-2'>
                    <Heart className='w-4 h-4' />
                    <h3 className='text-xs font-medium'>Favorites</h3>
                  </div>
                  <div className='text-xs text-gray-500 py-2 text-center'>
                    Save your favorite places
                  </div>
                </div>
              </div>

              {/* Contributions */}
              <div className='border-t border-gray-200'>
                <div className='p-3'>
                  <div className='flex items-center gap-2 text-gray-700 mb-2'>
                    <Users className='w-4 h-4' />
                    <h3 className='text-xs font-medium'>Contributions</h3>
                  </div>
                  <div className='text-xs text-gray-500 py-2 text-center'>
                    Help improve maps
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div className='border-t border-gray-200'>
                <div className='p-3'>
                  <div className='flex items-center gap-2 text-gray-700 mb-2'>
                    <Bell className='w-4 h-4' />
                    <h3 className='text-xs font-medium'>Updates</h3>
                  </div>
                  <div className='text-xs text-gray-500 py-2 text-center'>
                    No new updates
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showRoutes && (
          <div
            className={`p-3 border-t border-gray-200 ${!isOpen && "lg:hidden"}`}
          >
            <div className='text-[10px] text-gray-400 text-center'>
              © 2025 NaviGO Maps
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={onToggle}
        />
      )}
    </>
  );
}
