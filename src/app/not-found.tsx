"use client";

import Link from "next/link";
import { MapPin, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center px-4">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <MapPin className="w-24 h-24 text-blue-600 animate-bounce" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              !
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Location Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! Looks like you've ventured off the map. The page you're looking
          for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg border border-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-12">
          © 2025 NaviGO Maps - Your journey starts here
        </p>
      </div>
    </div>
  );
}

