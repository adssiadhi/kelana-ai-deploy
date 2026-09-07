"use client";

import React from "react";
import { AlertCircle, RefreshCw, ServerOff } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const isServerDown =
    message.toLowerCase().includes("failed to fetch") ||
    message.toLowerCase().includes("networkerror") ||
    message.toLowerCase().includes("connection");

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-8 animate-fade-in">
      <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 text-center shadow-md clip-chamfer-lg">
        <div className="w-14 h-14 mx-auto bg-neutral-200 text-neutral-600 flex items-center justify-center mb-4 clip-chamfer-sm">
          {isServerDown ? (
            <ServerOff className="w-7 h-7" />
          ) : (
            <AlertCircle className="w-7 h-7" />
          )}
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          Unable to generate itinerary
        </h3>

        <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
          {message || "An unexpected error occurred while communicating with the server. Please try again."}
        </p>

        {isServerDown && (
          <div className="bg-white border border-neutral-200 p-3.5 mb-6 text-xs text-neutral-700 text-left max-w-md mx-auto clip-chamfer-sm">
            <p className="font-semibold mb-1">Troubleshooting tip:</p>
            <p>Ensure the FastAPI backend server is running on <code className="bg-neutral-100 px-1 py-0.5 font-mono">http://localhost:8000</code>.</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-neutral-800 hover:bg-neutral-900 shadow-sm transition-all text-sm clip-chamfer-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Please try again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
