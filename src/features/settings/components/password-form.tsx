"use client";

import { updatePassword } from "../actions/update-password.action";
import { useState } from "react";
import { Lock, KeyRound, ShieldAlert, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);

  const [visibleFields, setVisibleFields] = useState({
    current: false,
    new: false,
    secret: false,
  });

  const toggleVisibility = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePassword(currentPassword, newPassword, secretKey);
      toast.success("Identity updated. Returning to the entrance...");
      setCurrentPassword("");
      setNewPassword("");
      setSecretKey("");
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full bg-sanctuary-50/50 border border-sanctuary-100 rounded-2xl pl-12 pr-5 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sanctuary-100/50 transition-all placeholder:text-sanctuary-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="grid gap-4">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 ml-1">
            Current Password
          </label>
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sanctuary-200 group-focus-within:text-sanctuary-500"
              size={16}
            />
            <input
              type={visibleFields.current ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClasses}
              required
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sanctuary-300"
            >
              {visibleFields.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 ml-1">
            New Password
          </label>
          <div className="relative group">
            <KeyRound
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sanctuary-200 group-focus-within:text-sanctuary-500"
              size={16}
            />
            <input
              type={visibleFields.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClasses}
              required
            />
            {/* Toggle Button */}
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sanctuary-300"
            >
              {visibleFields.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Secret Key */}
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
              type={visibleFields.secret ? "text" : "password"}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Your private 'shhh'..."
              className={inputClasses}
              required
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => toggleVisibility("secret")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sanctuary-300"
            >
              {visibleFields.secret ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sanctuary-700 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-sanctuary-800 transition-all disabled:opacity-50 shadow-button"
      >
        {loading ? "Verifying..." : "Commit Security Change"}
      </button>
    </form>
  );
}
