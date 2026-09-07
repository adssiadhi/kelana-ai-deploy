"use client";

import React from "react";
import Link from "next/link";
import { TripResponse } from "@/types";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Wallet,
  Tag,
  MapPin,
  Compass,
  Trash2,
  Globe,
  Mountain,
  Building,
  TreePine,
  Landmark,
} from "lucide-react";

interface TripCardProps {
  trip: TripResponse;
  onDelete?: (id: number) => void;
}

export function formatBudget(budget: number, currency: string = "USD"): string {
  if (budget === undefined || budget === null) return "USD 0";
  const num = Number(budget);
  return `${currency} ${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function getDestinationVisual(destination: string): {
  icon: React.ReactNode;
  landmark: string;
  country: string;
} {
  const dest = (destination || "").toLowerCase();

  if (dest.includes("japan") || dest.includes("tokyo") || dest.includes("kyoto") || dest.includes("osaka") || dest.includes("sapporo")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Mount Fuji & Torii", country: "Japan" };
  }
  if (dest.includes("bali") || dest.includes("indonesia") || dest.includes("jakarta") || dest.includes("lombok") || dest.includes("yogyakarta") || dest.includes("komodo")) {
    return { icon: <TreePine className="w-5 h-5" />, landmark: "Tropical Paradise", country: "Indonesia" };
  }
  if (dest.includes("france") || dest.includes("paris") || dest.includes("nice") || dest.includes("lyon")) {
    return { icon: <Building className="w-5 h-5" />, landmark: "Eiffel Tower", country: "France" };
  }
  if (dest.includes("singapore")) {
    return { icon: <Building className="w-5 h-5" />, landmark: "Marina Bay Sands", country: "Singapore" };
  }
  if (dest.includes("korea") || dest.includes("seoul") || dest.includes("busan") || dest.includes("jeju")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Gyeongbokgung Palace", country: "South Korea" };
  }
  if (dest.includes("usa") || dest.includes("united states") || dest.includes("new york") || dest.includes("california") || dest.includes("hawaii") || dest.includes("los angeles")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Statue of Liberty", country: "USA" };
  }
  if (dest.includes("uk") || dest.includes("united kingdom") || dest.includes("london") || dest.includes("scotland") || dest.includes("england")) {
    return { icon: <Building className="w-5 h-5" />, landmark: "Big Ben & Tower", country: "United Kingdom" };
  }
  if (dest.includes("italy") || dest.includes("rome") || dest.includes("venice") || dest.includes("florence") || dest.includes("milan")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Colosseum & Canals", country: "Italy" };
  }
  if (dest.includes("thailand") || dest.includes("bangkok") || dest.includes("phuket") || dest.includes("chiang mai")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Wat Arun Temple", country: "Thailand" };
  }
  if (dest.includes("australia") || dest.includes("sydney") || dest.includes("melbourne")) {
    return { icon: <Building className="w-5 h-5" />, landmark: "Sydney Opera House", country: "Australia" };
  }
  if (dest.includes("germany") || dest.includes("berlin") || dest.includes("munich")) {
    return { icon: <Building className="w-5 h-5" />, landmark: "Neuschwanstein Castle", country: "Germany" };
  }
  if (dest.includes("spain") || dest.includes("barcelona") || dest.includes("madrid")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Sagrada Familia", country: "Spain" };
  }
  if (dest.includes("switzerland") || dest.includes("swiss") || dest.includes("zurich") || dest.includes("geneva")) {
    return { icon: <Mountain className="w-5 h-5" />, landmark: "Swiss Alps", country: "Switzerland" };
  }
  if (dest.includes("vietnam") || dest.includes("hanoi") || dest.includes("da nang") || dest.includes("ho chi minh")) {
    return { icon: <TreePine className="w-5 h-5" />, landmark: "Ha Long Bay", country: "Vietnam" };
  }
  if (dest.includes("turkey") || dest.includes("istanbul") || dest.includes("cappadocia")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Hagia Sophia", country: "Turkey" };
  }
  if (dest.includes("egypt") || dest.includes("cairo")) {
    return { icon: <Landmark className="w-5 h-5" />, landmark: "Giza Pyramids", country: "Egypt" };
  }

  return { icon: <Globe className="w-5 h-5" />, landmark: "Global Adventure", country: "World" };
}

export function getCategoryBadge(category: string): { label: string; badgeClass: string; icon: React.ReactNode } {
  const cat = (category || "").toLowerCase().trim();
  if (cat === "backpacker" || cat.includes("budget") || cat.includes("backpacker")) {
    return { label: "Backpacker", badgeClass: "bg-neutral-200 text-neutral-700 border-neutral-300 font-bold", icon: <Tag className="w-3 h-3" /> };
  }
  if (cat === "luxury" || cat.includes("luxury") || cat.includes("premium")) {
    return { label: "Luxury", badgeClass: "bg-neutral-300 text-neutral-800 border-neutral-400 font-bold", icon: <Sparkles className="w-3 h-3" /> };
  }
  return { label: "Standard", badgeClass: "bg-neutral-100 text-neutral-700 border-neutral-200 font-bold", icon: <Tag className="w-3 h-3" /> };
}

export function getTravelStyleBadge(travelStyle?: string | null, id: number = 1): { label: string; badgeClass: string; icon: React.ReactNode } {
  let style = (travelStyle || "").trim().toLowerCase();
  if (!style || style === "standard") {
    const fallbackStyles = ["Solo", "Couple", "Family"];
    const chosen = fallbackStyles[id % fallbackStyles.length];
    style = chosen.toLowerCase();
  }
  if (style === "family" || style.includes("family") || style.includes("keluarga")) {
    return { label: "Family", badgeClass: "bg-neutral-200 text-neutral-700 border-neutral-300", icon: <Compass className="w-3 h-3" /> };
  }
  if (style === "couple" || style.includes("couple") || style.includes("pasangan") || style.includes("romance")) {
    return { label: "Couple", badgeClass: "bg-neutral-200 text-neutral-700 border-neutral-300", icon: <MapPin className="w-3 h-3" /> };
  }
  if (style === "solo" || style.includes("solo") || style.includes("sendiri")) {
    return { label: "Solo", badgeClass: "bg-neutral-200 text-neutral-700 border-neutral-300", icon: <Globe className="w-3 h-3" /> };
  }
  return { label: travelStyle || "Solo", badgeClass: "bg-neutral-200 text-neutral-700 border-neutral-300", icon: <Compass className="w-3 h-3" /> };
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const visual = getDestinationVisual(trip.destination);
  const categoryBadge = getCategoryBadge(trip.category);
  const travelStyleBadge = getTravelStyleBadge(trip.travel_style, trip.id);
  const formattedTotalBudget = formatBudget(trip.budget);
  const formattedDailyBudget = formatBudget(trip.daily_budget);
  const hasAiItinerary = Boolean(trip.ai_recommendation && trip.ai_recommendation.length > 20);

  return (
    <div className="group relative bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 clip-chamfer-lg">
      <div className="h-1 w-full bg-neutral-800" />

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-neutral-800 transition-colors clip-chamfer-sm">
                {visual.icon}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  {visual.country}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
                  {trip.destination}
                </h3>
              </div>
            </div>

            {onDelete && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(trip.id); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                title="Delete this itinerary"
                aria-label="Delete itinerary"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200 clip-chamfer-sm">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>{visual.landmark}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border shadow-xs clip-chamfer-sm ${categoryBadge.badgeClass}`}>
              {categoryBadge.icon}
              <span>{categoryBadge.label}</span>
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border shadow-xs clip-chamfer-sm ${travelStyleBadge.badgeClass}`}>
              {travelStyleBadge.icon}
              <span>{travelStyleBadge.label}</span>
            </span>
            {hasAiItinerary && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-neutral-200 text-neutral-700 border border-neutral-300 clip-chamfer-sm">
                <Sparkles className="w-3 h-3 text-neutral-500" />
                <span>AI Ready</span>
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 space-y-2.5 mb-5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-neutral-500 font-medium flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-neutral-500" /> Total Budget:
            </span>
            <span className="font-extrabold text-neutral-900 text-sm sm:text-base">{formattedTotalBudget}</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-neutral-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neutral-500" /> Duration:
            </span>
            <span className="font-bold text-neutral-800">{trip.days} Days</span>
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-neutral-400" /> Daily Rate:
            </span>
            <span className="font-semibold text-neutral-700">{formattedDailyBudget} / day</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href={`/trips/${trip.id}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-xs sm:text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-800 hover:text-white border border-neutral-200 hover:border-neutral-800 transition-all duration-200 shadow-xs group/btn clip-chamfer-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
