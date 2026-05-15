"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, User, Settings, LogOut } from "lucide-react";
import { logoutAction } from "../../auth/actions/logout.action";

export default function AvatarDropdown({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      setOpen(false);

      await logoutAction();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  }

  //user database  values
  const displayName = user?.name || "Lule";
  const displayEmail = user?.email || "luel@gmail.com";
  const displayBio = user?.bio || "በመኑ በአምሳለ መኑ አስተማስለኪ";
  const displayImage = user?.image || "/images/login-bg.jpg";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-sanctuary-50/50 transition-all duration-300"
      >
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-500 ${open ? "border-sanctuary-400 scale-95" : "border-white"}`}
          >
            <img
              src={displayImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Presence Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
        </div>

        <div className="text-left">
          <p className="text-sm font-serif italic text-gray-800 leading-none group-hover:text-sanctuary-600 transition-colors">
            {displayName}
          </p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-sanctuary-300 mt-1 font-bold">
            Active
          </p>
        </div>
        <ArrowDownToLine
          className={`w-3 h-3 text-sanctuary-200 transition-all duration-500 ${open ? "rotate-180 text-sanctuary-500" : "group-hover:translate-y-0.5"}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-4 w-72 bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/50 py-3 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* The Bio Section*/}
          <div className="px-6 py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-sanctuary-100 p-1">
              <img
                src={displayImage}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-base font-serif italic text-sanctuary-900 leading-tight">
              "{displayBio}"
            </p>
            <p className="text-[10px] uppercase tracking-widest text-sanctuary-300 mt-3 font-bold">
              {displayEmail}
            </p>
          </div>

          <div className="px-2 space-y-1">
            <DropdownItem
              icon={<Settings size={18} className="stroke-[1.5px]" />}
              label="Studio Settings"
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
            />

            <div className="h-px bg-gradient-to-r from-transparent via-sanctuary-100 to-transparent my-2" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-between px-5 py-4 text-sm text-red-400 hover:bg-red-50/50 rounded-2xl transition-all group"
            >
              <span className="font-bold text-[10px] uppercase tracking-widest text-red-500">
                Withdraw
              </span>
              <LogOut
                size={16}
                className="group-hover:translate-x-1 transition-transform opacity-70"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  function DropdownItem({
    icon,
    label,
    href,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    href: string;
    onClick: () => void;
  }) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-sanctuary-600 hover:text-sanctuary-700 hover:bg-sanctuary-50 transition-all group rounded-2xl"
      >
        <span className="text-sanctuary-400 group-hover:text-sanctuary-500 transition-colors">
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </Link>
    );
  }
}
