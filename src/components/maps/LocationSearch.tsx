"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Location } from "@/types/map";
import { RWANDA_LOCATIONS } from "@/lib/constants";

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = RWANDA_LOCATIONS.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (location: Location) => {
    setQuery(location.name);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(suggestions.length > 0)}
          placeholder="Search NaviGO Maps"
          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all text-xs shadow-sm"
        />
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto z-50">
          {suggestions.map((location) => (
            <button
              key={location.name}
              onClick={() => handleSelect(location)}
              className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="text-xs font-medium text-gray-900">{location.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

