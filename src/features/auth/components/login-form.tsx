"use client";

import Image from "next/image";
import { Feather, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const DEMO_USER = {
    email: "demo@innerspace.com",
    password: "demo123",
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "The gates remain closed");

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }


  async function handleDemoLogin() {
    try {
      setError(null);
      setIsLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DEMO_USER),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Demo login failed");
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 selection:bg-sanctuary-200 overflow-hidden">
      {/* 1.  Background */}
      <Image
        src="/images/log-bg2.jpg"
        alt="Background"
        fill
        priority
        className={`object-cover transition-transform duration-10000 scale-110 ${isSuccess ? "scale-125 blur-sm" : ""}`}
      />

      {/* 2. Color Wash Overlay */}
      <div
        className={`absolute inset-0 bg-sanctuary-50/60 backdrop-blur-[2px] transition-opacity duration-1000 ${isSuccess ? "opacity-0" : "opacity-100"}`}
      />

      {/* 3. The Login Card */}
      <div
        className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isSuccess ? "opacity-0 translate-y-4 scale-95" : "animate-in fade-in zoom-in-95"}`}
      >
        <div className="bg-white/40 backdrop-blur-xl p-8 md:p-10 rounded-[40px] border border-white/40 shadow-2xl shadow-sanctuary-900/10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
              <Feather
                className={`w-8 h-8 text-sanctuary-500 ${isLoading ? "animate-bounce" : "animate-pulse"}`}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-serif italic text-center text-gray-900 tracking-tight leading-tight">
              {/* Main Greeting */}
              Step into the{" "}
              <span className="text-sanctuary-600">stillness.</span>
              {/* Sub-greeting */}
              <span className="block mt-4 text-[11px] font-bold uppercase tracking-[0.4em] text-sanctuary-400">
                • Your Spirit’s Sanctuary
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1">
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full py-4 px-6 rounded-2xl border border-sanctuary-200/50 bg-white/50 font-body focus:outline-none focus:ring-2 focus:ring-sanctuary-400 focus:bg-white transition-all placeholder:text-sanctuary-300 text-sanctuary-800"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className="w-full py-4 px-6 rounded-2xl border border-sanctuary-200/50 bg-white/50 font-body focus:outline-none focus:ring-2 focus:ring-sanctuary-400 focus:bg-white transition-all placeholder:text-sanctuary-300 text-sanctuary-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-sanctuary-300 hover:text-sanctuary-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-medium italic animate-bounce">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-4 rounded-2xl bg-sanctuary-600 text-white font-bold tracking-[0.2em] uppercase text-[10px]
             shadow-lg shadow-sanctuary-600/20 hover:bg-sanctuary-700 hover:-translate-y-0.5 active:scale-[0.98]
             transition-all duration-300 disabled:opacity-70 disabled:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    {/* A spinning pulse  */}
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Ascending...
                  </>
                ) : (
                  "Enter Sanctuary"
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-3 rounded-2xl border border-sanctuary-300/40 bg-white/40 text-sanctuary-700 font-medium text-sm hover:bg-white/60 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              Try Demo Account
            </button>

            
          </form>

          <div className="mt-8 flex flex-col items-center gap-2">
            {/* The Visual Divider*/}
            <div className="h-px w-8 bg-linear-to-r from-transparent via-sanctuary-200 to-transparent" />

            <p className="text-center text-[10px] text-sanctuary-400 uppercase tracking-[0.3em] font-semibold leading-relaxed">
              <span className="text-sanctuary-600">ምዕናም</span> • MI’ENAM v1.0
              <span className="block mt-1 font-serif italic lowercase tracking-normal text-[10px] opacity-70">
                the ascent of the heart
              </span>
            </p>
          </div>
        </div>
      </div>

      {/*  THE WHITE Success Overlay transition */}
      {isSuccess && (
        <div className="fixed inset-0 z- bg-white animate-in fade-in duration-1000 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-sanctuary-50 rounded-full flex items-center justify-center animate-pulse">
              <Feather className="w-10 h-10 text-sanctuary-400" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif italic text-gray-800">
                Peace be with you.
              </h2>
              <p className="text-[10px] uppercase tracking-[0.5em] text-sanctuary-400">
                Opening the Sanctuary...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
