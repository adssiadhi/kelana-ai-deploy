"use client";

import React from "react";
import { Sparkles, MapPin, ArrowRight, Bot, Bold } from "lucide-react";

interface HeroProps {
  onSelectQuickDestination: (dest: string, days: number, budget: number, style: string) => void;
  onScrollToForm: () => void;
}

const QUICK_DESTINATIONS = [
  { name: "Tokyo, Japan", days: 5, budget: 2000, style: "Standard", code: "JP" },
  { name: "Bali, Indonesia", days: 4, budget: 800, style: "Backpacker", code: "ID" },
  { name: "Paris, France", days: 6, budget: 3200, style: "Luxury", code: "FR" },
  { name: "Seoul, South Korea", days: 5, budget: 1800, style: "Standard", code: "KR" },
  { name: "Kyoto, Japan", days: 4, budget: 1500, style: "Standard", code: "JP" },
  { name: "Swiss Alps, Switzerland", days: 7, budget: 4500, style: "Luxury", code: "CH" },
];

export default function Hero({ onSelectQuickDestination, onScrollToForm }: HeroProps) {
  return (
    <section className="relative overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-4 mb-8 bg-neutral-100 border border-neutral-200 shadow-lg clip-chamfer-lg">
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-60">
        <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="900" cy="150" r="120" stroke="#a3a3a3" strokeWidth="1.5" fill="none" opacity="0.3" />
          <ellipse cx="900" cy="150" rx="60" ry="120" stroke="#a3a3a3" strokeWidth="1" fill="none" opacity="0.2" />
          <line x1="780" y1="150" x2="1020" y2="150" stroke="#a3a3a3" strokeWidth="1" opacity="0.2" />
          <line x1="900" y1="30" x2="900" y2="270" stroke="#a3a3a3" strokeWidth="1" opacity="0.2" />
          <g transform="translate(200, 100) rotate(-15)">
            <path d="M0 20 L60 0 L80 0 L70 20 L80 40 L60 40 Z" fill="#525252" opacity="0.15" />
            <path d="M20 10 L40 -10 L45 -10 L35 10" fill="#525252" opacity="0.15" />
            <path d="M20 30 L40 50 L45 50 L35 30" fill="#525252" opacity="0.15" />
          </g>
          <path d="M0 500 L150 300 L300 500 Z" fill="#e5e5e5" opacity="0.5" />
          <path d="M100 500 L280 250 L460 500 Z" fill="#d4d4d4" opacity="0.4" />
          <path d="M250 500 L400 320 L550 500 Z" fill="#e5e5e5" opacity="0.3" />
          <ellipse cx="150" cy="80" rx="60" ry="20" fill="#f5f5f5" opacity="0.6" />
          <ellipse cx="500" cy="60" rx="45" ry="15" fill="#f5f5f5" opacity="0.5" />
          <ellipse cx="700" cy="100" rx="50" ry="18" fill="#f5f5f5" opacity="0.4" />
          <g transform="translate(1050, 450)">
            <circle r="40" fill="none" stroke="#a3a3a3" strokeWidth="1" opacity="0.3" />
            <polygon points="0,-35 5,-5 -5,-5" fill="#525252" opacity="0.2" />
            <polygon points="0,35 5,5 -5,5" fill="#a3a3a3" opacity="0.15" />
            <polygon points="-35,0 -5,5 -5,-5" fill="#a3a3a3" opacity="0.15" />
            <polygon points="35,0 5,5 5,-5" fill="#a3a3a3" opacity="0.15" />
          </g>
          <path d="M100 200 Q300 150 500 200 T900 180" stroke="#525252" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.2" />
        </svg>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-100/80 via-transparent to-neutral-200/60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-20 lg:py-24 text-left">

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight mb-4">
          Travel Smarter. {" "}
          <span className="text-neutral-600">
           Explore More
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed mb-8">
          Your next adventure starts here. Just enter your destination, budget, and trip duration, and kelana-ai will create a personalized itinerary tailored to your trip — from morning adventures to evening experiences.
           Your trip - Your budget - Your journey.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white bg-neutral-900 hover:bg-neutral-800 shadow-lg transition-all clip-chamfer-sm"
          >
            <Bot className="w-5 h-5" /> Plan Your Next Trip
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#destinations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 transition-all clip-chamfer-sm"
          >
            <MapPin className="w-4 h-4 text-neutral-500" /> Explore Destinations
          </a>
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            Popular Suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_DESTINATIONS.map((item) => (
              <button
                key={item.name}
                onClick={() => onSelectQuickDestination(item.name, item.days, item.budget, item.style)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 transition-all clip-chamfer-sm cursor-pointer"
              >
                <span className="text-[10px] font-bold text-neutral-400">{item.code}</span>
                <span>{item.name}</span>
                <span className="text-neutral-400">({item.days}d · ${item.budget})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
