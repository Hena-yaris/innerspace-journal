"use client";

import { useState, useEffect } from "react";

export default function DashboardGreeting() {
  const [timeGreeting, setTimeGreeting] = useState("ሰላም");
  const userName = "ዕጹብ";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting("ደና አደርሽ");
    else if (hour < 18) setTimeGreeting("ደና ዋልሽ");
    else setTimeGreeting("ደና አመሸሽ");
  }, []);

  return (
    <div className="space-y-4 my-12 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out group">
      {/*  1.greeting */}
      <div className="flex items-center gap-4">
        <h2 className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-sanctuary-500">
          <span className="text-sanctuary-700 font-bold">
            {timeGreeting}፣ {userName}
          </span>
        </h2>
        <div className="h-[1px] w-8 bg-sanctuary-200 rounded-full transition-all duration-1000 group-hover:w-24 group-hover:bg-sanctuary-400" />
      </div>

      {/*  2. The  Prompt */}
      <div className="space-y-3">
        <h1 className="text-4xl md:text-7xl font-serif italic tracking-tighter text-gray-900 leading-[1.1] transition-all duration-700">
          Which <span className="text-sanctuary-600">inner world</span>{" "}
          <br className="hidden md:block" />
          are we visiting today?
        </h1>

        {/* The  Minimalist */}
        <p className="flex items-center gap-3 text-[10px] md:text-xs text-sanctuary-400 font-bold uppercase tracking-[0.5em]">
          ዕጹብ • POEMS • IDEAS • ምዕናም
        </p>
      </div>

      {/*  3. The Minimalist Detail */}
      <div className="flex items-center gap-3 pt-4">
        <div className="h-1 w-1 bg-sanctuary-600 rounded-full" />
        <p className="text-[9px] text-sanctuary-300 uppercase tracking-[0.2em] font-medium">
          unfold the wonder
        </p>
      </div>
    </div>
  );
}
