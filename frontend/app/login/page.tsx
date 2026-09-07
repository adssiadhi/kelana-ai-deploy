"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/trips";
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, authLoading, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await login({ email, password });
      router.push(redirect);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 text-neutral-900 selection:bg-neutral-800 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-3 group mb-6">
          <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center shadow-lg text-white font-light text-xl clip-chamfer-sm group-hover:scale-105 transition-transform tracking-tighter">
            K
          </div>
          <span className="text-2xl sm:text-3xl font-light tracking-tighter text-neutral-900">
            kelana<span className="text-neutral-400">-ai</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Sign in to access your private AI travel itineraries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 z-10">
        <div className="bg-white border border-neutral-200 py-8 px-6 sm:px-10 shadow-xl clip-chamfer-lg">
          {error && (
            <div className="mb-6 p-4 bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs sm:text-sm flex items-start gap-3 clip-chamfer-sm">
              <AlertCircle className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="h-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nick@mail.com"
                  className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all clip-chamfer-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="h-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-11 pr-11 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all clip-chamfer-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-bold text-sm text-white bg-neutral-900 hover:bg-neutral-800 shadow-lg transition-all clip-chamfer-sm disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              Don&apos;t have an account yet?{" "}
              <Link
                href={redirect !== "/trips" ? `/register?redirect=${encodeURIComponent(redirect)}` : "/register"}
                className="font-bold text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-700 rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
