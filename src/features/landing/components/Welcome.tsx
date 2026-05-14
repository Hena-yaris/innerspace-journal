"use client"

import Link from "next/link"
import { Feather, Sparkles } from "lucide-react"


export default function Welcome(){

    return (
      <section >
        <div
          className="fixed inset-0 z-0 bg-cover bg-center opacity-[0.03] pointer-events-none grayscale"
          style={{ backgroundImage: "url('/images/lo-bg.jpg')" }}
        />

        <div className="relative z-10 text-center space-y-12 px-6 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-white shadow-sm border border-sanctuary-100 text-sanctuary-600">
                <Feather size={32} strokeWidth={1} className="-rotate-45" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-5xl md:text-7xl italic text-gray-900 tracking-tight">
                ምዕናም
              </h1>
              <p className="text-[10px] tracking-[0.6em] uppercase text-sanctuary-400 font-bold">
                The Sanctuary Studio
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-8">
            <p className="font-serif italic text-sanctuary-600 leading-relaxed text-lg">
              "A private garden for your reflections. <br />
              Built to house your journey."
            </p>

            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-4 px-10 py-4 bg-sanctuary-700 text-white rounded-full shadow-xl hover:bg-sanctuary-900 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="text-xs uppercase tracking-[0.4em] font-bold">
                Enter the Sanctuary
              </span>
              <Sparkles
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
            </Link>
          </div>

          {/* Birthday Note */}
          <footer className="pt-20">
            <p className="text-[9px] uppercase tracking-[0.4em] text-sanctuary-300 font-medium">
              Henok • 2018
            </p>
          </footer>
        </div>
      </section>
    );

}