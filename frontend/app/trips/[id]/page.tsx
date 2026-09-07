"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import FormattedText from "@/components/FormattedText";
import { getDestinationVisual, getCategoryBadge, getTravelStyleBadge, formatBudget } from "@/components/TripCard";
import { TripResponse, ParsedItinerary } from "@/types";
import { getTrip, generateItinerary } from "@/services/tripService";
import { parseAIItinerary } from "@/lib/parser";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  ArrowLeft,
  Calendar,
  Wallet,
  Sparkles,
  MapPin,
  Tag,
  Sunrise,
  Sun,
  Moon,
  Utensils,
  Lightbulb,
  Copy,
  Printer,
  FileText,
  CheckCircle2,
  RefreshCw,
  PlusCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

function TripDetailContent() {
  const router = useRouter();
  const routeParams = useParams();
  const rawId = routeParams?.id || "";
  const tripId = Number(rawId);

  const [trip, setTrip] = useState<TripResponse | null>(null);
  const [itinerary, setItinerary] = useState<ParsedItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const fetchTripDetails = async () => {
    if (!tripId || isNaN(tripId)) {
      setError("Invalid trip ID");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getTrip(tripId);
      setTrip(data);

      if (data.ai_recommendation) {
        const parsed = parseAIItinerary(
          data.ai_recommendation,
          data.destination,
          data.days,
          data.budget,
          data.daily_budget,
          data.category
        );
        parsed.travelStyle = data.travel_style || "Standard";
        setItinerary(parsed);
      }
    } catch (err: any) {
      console.error("Error fetching trip detail:", err);
      setError(err?.message || `Trip #${tripId} could not be loaded.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  const handleGenerateAI = async () => {
    if (!trip) return;
    setIsGenerating(true);
    try {
      const genResult = await generateItinerary(trip.id);
      const parsed = parseAIItinerary(
        genResult.recommendation,
        trip.destination,
        trip.days,
        trip.budget,
        trip.daily_budget,
        trip.category
      );
      parsed.travelStyle = trip.travel_style || "Standard";
      setTrip((prev) => (prev ? { ...prev, ai_recommendation: genResult.recommendation } : null));
      setItinerary(parsed);
    } catch (err: any) {
      alert(err?.message || "Failed to generate AI itinerary");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!trip?.ai_recommendation) return;
    try {
      await navigator.clipboard.writeText(trip.ai_recommendation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24">
          <LoadingSpinner destination="Trip Itinerary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-16 text-center">
          <div className="bg-white clip-chamfer-lg border border-slate-200 p-10 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              !
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Trip Not Found</h2>
            <p className="text-sm text-slate-600 mb-6">{error || "We could not locate this itinerary in the database."}</p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 px-5 py-2.5 clip-chamfer-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Trips
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 clip-chamfer-sm bg-neutral-800 hover:bg-neutral-900 text-white font-bold text-xs transition-all"
              >
                <PlusCircle className="w-4 h-4" /> Create New Trip
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const visual = getDestinationVisual(trip.destination);
  const categoryBadge = getCategoryBadge(trip.category);
  const travelStyleBadge = getTravelStyleBadge(trip.travel_style, trip.id);
  const formattedBudget = formatBudget(trip.budget);
  const formattedDailyBudget = formatBudget(trip.daily_budget);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-neutral-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-neutral-600 transition-colors bg-white px-3.5 py-2 clip-chamfer-sm border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Trips</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-800 bg-neutral-100 px-3 py-2 clip-chamfer-sm border border-neutral-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Plan New Itinerary</span>
            </Link>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-slate-100 border border-slate-200 text-slate-900 clip-chamfer-lg shadow-xl mb-8 overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 clip-chamfer-sm bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                    {visual.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200">
                    {visual.country}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Trip #{trip.id}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                  <span>{trip.destination}</span>
                </h1>
                <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  <span>{visual.landmark}</span>
                </p>
              </div>

              {/* Header Badges */}
              <div className="flex flex-wrap md:flex-col gap-2.5 items-start md:items-end">
                {/* Category Badge */}
                <div className={`px-3.5 py-1.5 clip-chamfer-sm text-xs border font-bold flex items-center gap-1.5 shadow-sm ${categoryBadge.badgeClass}`}>
                  <span>{categoryBadge.icon}</span>
                  <span>{categoryBadge.label} Tier</span>
                </div>

                {/* Travel Style Badge */}
                <div className={`px-3.5 py-1.5 clip-chamfer-sm text-xs border font-bold flex items-center gap-1.5 shadow-sm ${travelStyleBadge.badgeClass}`}>
                  <span>{travelStyleBadge.icon}</span>
                  <span>{travelStyleBadge.label} Style</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-200">
              <div className="bg-white clip-chamfer p-4 border border-slate-200">
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">
                  Total Budget
                </span>
                <span className="text-xl sm:text-2xl font-black text-neutral-600 mt-1 block">
                  {formattedBudget}
                </span>
              </div>

              <div className="bg-white clip-chamfer p-4 border border-slate-200">
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">
                  Duration
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  {trip.days} Days
                </span>
              </div>

              <div className="bg-white clip-chamfer p-4 border border-slate-200">
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">
                  Daily Allocation
                </span>
                <span className="text-xl sm:text-2xl font-black text-neutral-600 mt-1 block">
                  {formattedDailyBudget}
                </span>
              </div>

              <div className="bg-white clip-chamfer p-4 border border-slate-200">
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">
                  AI Model
                </span>
                <span className="text-xl sm:text-2xl font-black text-neutral-600 mt-1 block">
                  Bedrock
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar Controls */}
        {trip.ai_recommendation && (
          <div className="bg-white clip-chamfer border border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs mb-8 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <Sparkles className="w-4 h-4 text-neutral-600" />
              <span>Amazon Bedrock AI Recommendation</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 clip-chamfer-sm border border-slate-200 bg-white hover:bg-neutral-200 text-neutral-800 font-medium transition-all shadow-xs"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600" />
                    <span className="text-neutral-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Itinerary</span>
                  </>
                )}
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 clip-chamfer-sm border border-slate-200 bg-white hover:bg-neutral-200 text-neutral-800 font-medium transition-all shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setShowRaw(!showRaw)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 clip-chamfer-sm border border-slate-200 bg-white hover:bg-neutral-200 text-neutral-800 font-medium transition-all shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>{showRaw ? "Formatted View" : "Raw AI Text"}</span>
              </button>
            </div>
          </div>
        )}

        {/* AI Recommendation Content */}
        {!trip.ai_recommendation ? (
          /* Empty AI State - Allow generating now */
          <div className="bg-white clip-chamfer-lg border border-slate-200 p-10 text-center shadow-sm">
            <div className="w-16 h-16 clip-chamfer bg-neutral-100 text-neutral-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No AI Itinerary Generated Yet</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              This trip is stored in PostgreSQL. Generate a full daily schedule with Amazon Bedrock generative AI now.
            </p>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-3.5 clip-chamfer font-bold text-white bg-neutral-800 hover:bg-neutral-900 shadow-lg shadow-neutral-600/25 transition-all disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting to Amazon Bedrock...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Itinerary Now</span>
                </>
              )}
            </button>
          </div>
        ) : showRaw ? (
          /* Raw AI Text View */
          <div className="bg-slate-900 text-slate-100 clip-chamfer-lg p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap shadow-xl">
            {trip.ai_recommendation}
          </div>
        ) : itinerary ? (
          /* Structured Parsed View */
          <div className="space-y-8">
            {/* Day by Day Schedule */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-neutral-600" />
                    <span>Daily Schedule Breakdown</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tailored schedule organized by morning, afternoon, and evening slots.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-100 text-neutral-800">
                  {itinerary.dailyPlans.length} Days Planned
                </span>
              </div>

              <div className="space-y-4">
                {itinerary.dailyPlans.map((day) => {
                  const isExpanded = activeDay === null || activeDay === day.dayNumber;
                  return (
                    <div
                      key={day.dayNumber}
                      className="border border-slate-200 clip-chamfer overflow-hidden shadow-xs hover:shadow-md transition-all bg-white"
                    >
                      <div
                        onClick={() =>
                          setActiveDay(activeDay === day.dayNumber ? null : day.dayNumber)
                        }
                        className="bg-slate-50 hover:bg-neutral-100/50 px-5 py-4 flex items-center justify-between cursor-pointer transition-colors border-b border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 clip-chamfer-sm bg-neutral-800 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                            D{day.dayNumber}
                          </span>
                          <FormattedText
                            text={day.title}
                            badgeStyle={false}
                            className="font-bold text-slate-900 text-base"
                          />
                        </div>
                        <button
                          type="button"
                          className="text-slate-400 hover:text-slate-700 p-1"
                          aria-label="Toggle day"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Morning */}
                          <div className="bg-neutral-100/60 border border-neutral-200/70 clip-chamfer-sm p-4">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider mb-2.5">
                              <Sunrise className="w-4 h-4 text-neutral-600" />
                              <span>Morning</span>
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                              {day.morning.map((act, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-500 font-bold">•</span>
                                  <FormattedText text={act} />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Afternoon */}
                          <div className="bg-neutral-100/60 border border-neutral-200/70 clip-chamfer-sm p-4">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider mb-2.5">
                              <Sun className="w-4 h-4 text-neutral-600" />
                              <span>Afternoon</span>
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                              {day.afternoon.map((act, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-500 font-bold">•</span>
                                  <FormattedText text={act} />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Evening */}
                          <div className="bg-neutral-100/60 border border-neutral-200/70 clip-chamfer-sm p-4">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider mb-2.5">
                              <Moon className="w-4 h-4 text-neutral-600" />
                              <span>Evening</span>
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                              {day.evening.map((act, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-500 font-bold">•</span>
                                  <FormattedText text={act} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Food & Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Culinary Highlights */}
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-100 border border-neutral-200/80 clip-chamfer p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-base mb-3">
                  <div className="w-8 h-8 clip-chamfer-sm bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <h4>Local Food & Dining Recommendations</h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                  {itinerary.foodRecommendations.map((food, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 clip-chamfer-sm border border-neutral-100">
                      <span className="text-neutral-500"><Utensils className="w-4 h-4" /></span>
                      <FormattedText text={food} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Travel Tips */}
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-100 border border-neutral-200/80 clip-chamfer p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-base mb-3">
                  <div className="w-8 h-8 clip-chamfer-sm bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h4>Smart Travel & Practical Tips</h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                  {itinerary.travelTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 clip-chamfer-sm border border-neutral-100">
                      <span className="text-neutral-600 font-bold">✓</span>
                      <FormattedText text={tip} badgeStyle={false} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Budget Breakdown Summary */}
            <div className="bg-slate-900 text-white clip-chamfer-lg p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 clip-chamfer-sm bg-neutral-500/20 text-neutral-400 flex items-center justify-center border border-neutral-400/30">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">Estimated Expense Allocation</h4>
                    <p className="text-xs text-slate-400">
                      Optimized for {itinerary.category} style (${itinerary.dailyBudget.toFixed(0)}/day)
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Total Budget</span>
                  <span className="text-xl font-extrabold text-neutral-400">
                    {formattedBudget}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/5 border border-white/10 clip-chamfer-sm p-3.5">
                  <span className="text-slate-400 block mb-1">Lodging (40%)</span>
                  <span className="text-base font-bold text-white">
                    ${(itinerary.budget * 0.4).toFixed(0)}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 clip-chamfer-sm p-3.5">
                  <span className="text-slate-400 block mb-1">Food & Dining (25%)</span>
                  <span className="text-base font-bold text-white">
                    ${(itinerary.budget * 0.25).toFixed(0)}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 clip-chamfer-sm p-3.5">
                  <span className="text-slate-400 block mb-1">Tours & Entry (20%)</span>
                  <span className="text-base font-bold text-white">
                    ${(itinerary.budget * 0.2).toFixed(0)}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 clip-chamfer-sm p-3.5">
                  <span className="text-slate-400 block mb-1">Transport (15%)</span>
                  <span className="text-base font-bold text-white">
                    ${(itinerary.budget * 0.15).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default function TripDetailPage() {
  return (
    <ProtectedRoute>
      <TripDetailContent />
    </ProtectedRoute>
  );
}
