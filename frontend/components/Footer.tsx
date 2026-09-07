"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-700 flex items-center justify-center text-white font-light shadow-md clip-chamfer-sm tracking-tighter text-sm">
              K
            </div>
            <span className="text-lg font-light tracking-tighter text-white">
              kelana<span className="text-neutral-400">-ai</span>
            </span>
          </div>
          <p className="text-xs text-neutral-500">&copy; {new Date().getFullYear()} kelana-ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
