"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-neutral-200 text-neutral-700 border border-neutral-300 mb-3 clip-chamfer-sm">
          <Layers className="w-3.5 h-3.5 text-neutral-500" /> Architecture & Capabilities
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          How kelana-ai Creates Your Journey
        </h2>
        <p className="text-sm text-neutral-600 mt-2">
          End-to-end synergy between Next.js React frontend, Python FastAPI backend, and Amazon Bedrock Generative AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 hover:bg-white hover:shadow-lg transition-all clip-chamfer-lg">
          <div className="w-12 h-12 bg-neutral-200 text-neutral-700 flex items-center justify-center mb-5 font-black text-lg clip-chamfer-sm">
            1
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-2">
            1. User Preference & Budget
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Provide your destination, length of stay, and total budget. The system normalizes currency and calculates daily allowances in real-time.
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 hover:bg-white hover:shadow-lg transition-all clip-chamfer-lg">
          <div className="w-12 h-12 bg-neutral-200 text-neutral-700 flex items-center justify-center mb-5 font-black text-lg clip-chamfer-sm">
            2
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-2">
            2. Amazon Bedrock AI Reasoning
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            FastAPI prompts Amazon Bedrock using AWS Converse API to engineer personalized morning, afternoon, and evening daily itineraries.
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 hover:bg-white hover:shadow-lg transition-all clip-chamfer-lg">
          <div className="w-12 h-12 bg-neutral-200 text-neutral-700 flex items-center justify-center mb-5 font-black text-lg clip-chamfer-sm">
            3
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-2">
            3. Structured Visual Presentation
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            The AI recommendation is saved to PostgreSQL and formatted into an elegant, responsive web UI with food spots and travel tips.
          </p>
        </div>
      </div>
    </section>
  );
}
