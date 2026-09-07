"use client";

import React from "react";
import { Sparkles, Bot } from "lucide-react";

interface LoadingSpinnerProps {
  destination?: string;
}

export default function LoadingSpinner({ destination }: LoadingSpinnerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-10 animate-fade-in">
      <div className="bg-white text-neutral-900 rounded-none p-8 sm:p-12 text-center shadow-2xl border border-neutral-200 relative overflow-hidden clip-chamfer-lg">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-neutral-100 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-neutral-100 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 border-4 border-neutral-200 border-t-neutral-700 border-r-neutral-500 animate-spin clip-chamfer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-neutral-500 animate-pulse" />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
          Generating itinerary...
        </h3>
        <p className="text-neutral-600 font-semibold text-base sm:text-lg mb-4 flex items-center justify-center gap-2">
          <Bot className="w-5 h-5 text-neutral-500 animate-bounce" />
          Amazon Bedrock is thinking.
        </p>

        {destination && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-600 mb-6 clip-chamfer-sm">
            <span>Crafting personalized travel plan for:</span>
            <span className="font-bold text-neutral-900">{destination}</span>
          </div>
        )}

        <div className="max-w-md mx-auto grid grid-cols-3 gap-3 text-xs text-neutral-500 border-t border-neutral-200 pt-6">
          <div className="flex flex-col items-center gap-1.5 text-neutral-700">
            <span className="w-2 h-2 rounded-full bg-neutral-500 animate-ping" />
            <span>Analyzing Budget</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-neutral-600">
            <span className="w-2 h-2 rounded-full bg-neutral-400 animate-ping delay-150" />
            <span>Structuring Days</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-neutral-300 animate-ping delay-300" />
            <span>Local Curations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
