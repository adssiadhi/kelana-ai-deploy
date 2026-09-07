"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  FolderOpen,
  LogOut,
  LogIn,
  UserPlus,
  Bot,
  MessageSquare,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const isHomePage = pathname === "/";
  const isTripsPage = pathname === "/trips";
  const isAssistantPage = pathname === "/assistant";
  const isChatPage = pathname === "/chat";
  const isProfilePage = pathname === "/profile";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-neutral-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center shadow-md text-white font-light text-lg clip-chamfer-sm group-hover:scale-105 transition-transform tracking-tighter">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-light tracking-tighter text-neutral-900">
                  kelana<span className="text-neutral-400">-ai</span>
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/trips"
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 ${
                isTripsPage
                  ? "bg-neutral-100 text-neutral-900 border border-neutral-200 font-bold"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              <FolderOpen className="w-4 h-4 text-neutral-500" /> My Trips
            </Link>

            <Link
              href="/assistant"
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 ${
                isAssistantPage
                  ? "bg-neutral-100 text-neutral-900 border border-neutral-200 font-bold"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              <Bot className="w-4 h-4 text-neutral-500" /> AI Assistant
            </Link>

            <Link
              href="/chat"
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 ${
                isChatPage
                  ? "bg-neutral-100 text-neutral-900 border border-neutral-200 font-bold"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-neutral-500" /> Chat AI
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block">
                  <div className="text-xs font-bold text-neutral-800">
                    Welcome back, <span className="text-neutral-900">{user.name}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">{user.email}</div>
                </div>

                <Link
                  href="/profile"
                  className={`flex items-center gap-2 p-1.5 pr-3 border transition-all ${
                    isProfilePage
                      ? "bg-neutral-100 border-neutral-300 text-neutral-900"
                      : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
                  }`}
                  title="View Profile"
                >
                  <div className="w-8 h-8 bg-neutral-800 flex items-center justify-center text-white text-xs font-bold uppercase">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <span className="text-xs font-bold hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 shadow-sm transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-5 space-y-3">
          {isAuthenticated && user && (
            <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-800 flex items-center justify-center text-white font-bold uppercase">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">{user.name}</div>
                  <div className="text-[11px] text-neutral-500">{user.email}</div>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-neutral-700 px-2.5 py-1 bg-neutral-200"
              >
                Profile
              </Link>
            </div>
          )}

          <Link href="/trips" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100 font-semibold">
            My Trips Dashboard
          </Link>
          <Link href="/assistant" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-800 bg-neutral-50 hover:bg-neutral-100 font-semibold">
            Travel AI Assistant (RAG)
          </Link>
          <Link href="/chat" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-800 bg-neutral-50 hover:bg-neutral-100 font-semibold">
            Chat AI (Conversational Memory)
          </Link>
          {isAuthenticated && (
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100">
              My Profile
            </Link>
          )}

          <div className="pt-2 border-t border-neutral-100">
            {isAuthenticated ? (
              <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-4 text-center font-bold text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-4 text-center font-bold text-xs text-white bg-neutral-900 shadow-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
