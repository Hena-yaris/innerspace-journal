"use client";

import { updateEmail } from "../actions/update-email.action";
import { useState } from "react";
import { Mail, ArrowRight, ShieldAlert, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";

export default function EmailForm() {
  const [newEmail, setNewEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEmail({ newEmail, secretKey });

      toast.success("Identity updated. Returning to the entrance...");
      setNewEmail("");
      setSecretKey("");
    } catch (err: any) {
      toast.error(err.message || "Could not update email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 ml-1">
          New Email Address
        </label>
        <div className="relative group">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sanctuary-200 group-focus-within:text-sanctuary-500 transition-colors"
            size={16}
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="new@sanctuary.studio"
            className="w-full bg-sanctuary-50/50 border border-sanctuary-100 rounded-2xl pl-12 pr-5 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sanctuary-100/50 transition-all placeholder:text-sanctuary-200"
            required
          />
        </div>
      </div>

      {/* Secret Key Input */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 ml-1">
          The Master Phrase
        </label>
        <div className="relative group">
          <ShieldAlert
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sanctuary-200 group-focus-within:text-sanctuary-500"
            size={16}
          />
          <input
            type={showSecret ? "text" : "password"}
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Your private 'shhh'..."
            className="w-full bg-sanctuary-50/50 border border-sanctuary-100 rounded-2xl pl-12 pr-5 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sanctuary-100/50 transition-all placeholder:text-sanctuary-200"
            required
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowSecret(!showSecret)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sanctuary-300"
          >
            {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !newEmail || !secretKey}
        className="inline-flex items-center gap-2 bg-sanctuary-700 text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-sanctuary-800 transition-all disabled:opacity-30 shadow-sm"
      >
        {loading ? "Verifying..." : "Update Email"}
        <ArrowRight size={14} />
      </button>
    </form>
  );
}
