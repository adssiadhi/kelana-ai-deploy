"use client";

import React, { useState, useEffect } from "react";
import { TripFormData } from "@/types";
import {
  MapPin,
  Calendar,
  DollarSign,
  Sparkles,
  Compass,
  Wallet,
  Tag,
  Globe,
  Backpack,
  Crown,
  Users,
} from "lucide-react";

interface TravelFormProps {
  initialValues: TripFormData;
  onSubmit: (formData: TripFormData) => void;
  isLoading: boolean;
}

export default function TravelForm({ initialValues, onSubmit, isLoading }: TravelFormProps) {
  const [destination, setDestination] = useState(initialValues.destination);
  const [days, setDays] = useState<number | string>(initialValues.days);
  const [budget, setBudget] = useState<number | string>(initialValues.budget);
  const [travelStyle, setTravelStyle] = useState(initialValues.travelStyle || "Standard");

  useEffect(() => {
    setDestination(initialValues.destination);
    setDays(initialValues.days);
    setBudget(initialValues.budget);
    setTravelStyle(initialValues.travelStyle || "Standard");
  }, [initialValues]);

  const numDays = Math.max(1, Number(days) || 1);
  const numBudget = Math.max(0, Number(budget) || 0);
  const dailyBudget = numBudget / numDays;

  const derivedCategory =
    numBudget < 1000 ? "Backpacker" : numBudget <= 3000 ? "Standard" : "Luxury";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({
      destination: destination.trim(),
      days: numDays,
      budget: numBudget,
      travelStyle,
    });
  };

  return (
    <div id="planner" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-white border border-neutral-200 shadow-xl overflow-hidden clip-chamfer-lg">
        <div className="bg-neutral-100 border-b border-neutral-200 px-6 sm:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-neutral-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  AI Travel Itinerary Generator
                </h2>
              </div>
              <p className="text-sm text-neutral-500 mt-1">
                Customize your trip preferences and let AI create your daily schedule.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Destination <span className="text-neutral-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <MapPin className="h-5 w-5 text-neutral-500" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tokyo, Japan"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-sm font-medium transition-all bg-neutral-50 clip-chamfer-sm"
                />
              </div>
              <p className="text-[11px] text-neutral-500">City, region, or country</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Total Budget (USD) <span className="text-neutral-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <DollarSign className="h-5 w-5 text-neutral-600" />
                </div>
                <input
                  type="number"
                  required
                  min={50}
                  max={100000}
                  step={50}
                  placeholder="2000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-sm font-medium transition-all bg-neutral-50 clip-chamfer-sm"
                />
              </div>
              <p className="text-[11px] text-neutral-500">Estimated total expenses</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Duration (Days) <span className="text-neutral-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Calendar className="h-5 w-5 text-neutral-600" />
                </div>
                <input
                  type="number"
                  required
                  min={1}
                  max={30}
                  placeholder="5"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-sm font-medium transition-all bg-neutral-50 clip-chamfer-sm"
                />
              </div>
              <p className="text-[11px] text-neutral-500">Recommended 3 to 14 days</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Travel Preference / Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { label: "Standard", desc: "Balanced comfort & culture", icon: Globe },
                { label: "Backpacker", desc: "Budget & local gems", icon: Backpack },
                { label: "Luxury", desc: "Premium stays & fine dining", icon: Crown },
                { label: "Family", desc: "Kid-friendly & relaxed", icon: Users },
              ].map((style) => (
                <button
                  type="button"
                  key={style.label}
                  onClick={() => setTravelStyle(style.label)}
                  className={`p-3 border text-left transition-all clip-chamfer-sm ${
                    travelStyle === style.label
                      ? "border-neutral-500 bg-neutral-100 text-neutral-900 ring-2 ring-neutral-500/20 font-semibold"
                      : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
                  }`}
                >
                  <div className="mb-1">
                    <style.icon className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className="text-xs font-bold">{style.label}</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 clip-chamfer-sm">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shadow-sm shrink-0 clip-chamfer-sm">
                <Wallet className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Calculated Daily Budget:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-neutral-900">
                    ${dailyBudget.toFixed(2)}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">/ day per person</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs text-neutral-500 font-medium">Category tier:</span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider clip-chamfer-sm ${
                  derivedCategory === "Luxury"
                    ? "bg-neutral-200 text-neutral-800 border border-neutral-300"
                    : derivedCategory === "Standard"
                    ? "bg-neutral-200 text-neutral-800 border border-neutral-300"
                    : "bg-neutral-200 text-neutral-800 border border-neutral-300"
                }`}
              >
                <Tag className="w-3 h-3" />
                {derivedCategory}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !destination.trim()}
              className="w-full py-4 px-6 font-bold text-white bg-neutral-900 hover:bg-neutral-800 shadow-lg transition-all clip-chamfer-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to Amazon Bedrock...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Trip</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
