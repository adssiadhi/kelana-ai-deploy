"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  FolderOpen,
  Sparkles,
  LogOut,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-800 selection:text-white">
        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="bg-neutral-100 border border-neutral-200 text-neutral-900 p-6 sm:p-10 shadow-xl mb-8 clip-chamfer-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-800 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-lg shrink-0 uppercase select-none clip-chamfer-sm">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-neutral-200 text-neutral-700 border border-neutral-300 mb-2 clip-chamfer-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> Authenticated Traveler
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900">
                  {user?.name || "Traveler Profile"}
                </h1>
                <p className="text-sm text-neutral-500 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" />
                  <span>{user?.email}</span>
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 border border-neutral-300 text-xs font-bold transition-all shrink-0 cursor-pointer clip-chamfer-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-neutral-200">
              <div className="bg-white p-4 border border-neutral-200 clip-chamfer-sm">
                <div className="text-neutral-500 text-xs font-medium flex items-center gap-1.5">
                  <FolderOpen className="w-3.5 h-3.5 text-neutral-500" /> Total Itineraries
                </div>
                <div className="text-xl sm:text-2xl font-black text-neutral-900 mt-1">
                  {user?.total_trips ?? 0} Trips
                </div>
              </div>

              <div className="bg-white p-4 border border-neutral-200 clip-chamfer-sm">
                <div className="text-neutral-500 text-xs font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" /> Account Security
                </div>
                <div className="text-xl sm:text-2xl font-black text-neutral-700 mt-1">
                  JWT Verified
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white p-4 border border-neutral-200 clip-chamfer-sm">
                <div className="text-neutral-500 text-xs font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-500" /> AI Access
                </div>
                <div className="text-xl sm:text-2xl font-black text-neutral-700 mt-1">
                  Amazon Bedrock
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <Link
              href="/trips"
              className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-neutral-400 hover:shadow-lg transition-all group flex items-start justify-between clip-chamfer-lg"
            >
              <div>
                <div className="w-12 h-12 bg-neutral-100 text-neutral-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform clip-chamfer-sm">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  My Trip History
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  View and manage your private travel plans stored securely in PostgreSQL.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-1 transition-all mt-2" />
            </Link>

            <Link
              href="/"
              className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-neutral-400 hover:shadow-lg transition-all group flex items-start justify-between clip-chamfer-lg"
            >
              <div>
                <div className="w-12 h-12 bg-neutral-100 text-neutral-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform clip-chamfer-sm">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  Generate New Itinerary
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Create a customized daily travel schedule with Amazon Bedrock AI.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-1 transition-all mt-2" />
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
