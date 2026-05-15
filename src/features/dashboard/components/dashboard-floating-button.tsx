"use client";

import Link from "next/link";
import { Plus, Feather } from "lucide-react";

export default function DashboardFloatingButton() {
  return (
    <div className="fixed bottom-10 right-10 z-50 group">
      <Link
        href="/dashboard/new"
        aria-label="Create new writing"
        className="
          relative w-16 h-16
          flex items-center justify-center
          rounded-2xl bg-sanctuary-700 text-white
          shadow-[0_10px_25px_-5px_rgba(var(--sanctuary-700-rgb),0.4)]
          hover:shadow-[0_20px_35px_-10px_rgba(var(--sanctuary-700-rgb),0.5)]
          hover:-translate-y-2 active:scale-95
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          group-hover:rounded-[2.5rem]
        "
      >
        {/* The Icon */}
        <div className="relative">
          <Plus
            size={32}
            className="stroke-[1.5] transition-transform duration-500 group-hover:rotate-90 group-hover:opacity-0"
          />
          <Feather
            size={28}
            className="absolute inset-0 opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
          />
        </div>

        {/* Inner Glow f */}
        <div className="absolute inset-0 rounded-inherit border border-white/20 pointer-events-none" />
      </Link>

      {/* Tooltip */}
      <div
        className="
          absolute right-full mr-6 top-1/2 -translate-y-1/2
          bg-white/80 backdrop-blur-md border border-sanctuary-100
          text-sanctuary-700 text-[10px] font-bold uppercase tracking-[0.3em]
          px-4 py-2 rounded-xl
          opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-500 ease-out
          pointer-events-none whitespace-nowrap shadow-sm
        "
      >
        Begin Ascent
        {/* The small arrow tail */}
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-white/80 border-r border-t border-sanctuary-100" />
      </div>
    </div>
  );
}
