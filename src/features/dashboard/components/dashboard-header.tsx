


import { Feather } from "lucide-react";
import AvatarDropdown from "../../user/components/avatar-dropdown";

import { serialize } from "@/src/utils/serialize";
import { getAuthenticatedUser } from "../../user/actions/get-authenticated-user";

export default async function DashboardHeader() {
  const user = await getAuthenticatedUser();

  return (
    <header className="relative z-20">
      <div className="flex justify-between items-center h-24 ">
        {/*  Brand Section*/}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            {/* Soft glow behind the feather */}
            <div className="absolute inset-0 bg-sanctuary-200 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-2.5 bg-white rounded-2xl shadow-sm border border-sanctuary-100 group-hover:border-sanctuary-200 transition-all">
              <Feather className="w-6 h-6 text-sanctuary-600 -rotate-45" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-serif italic tracking-tight text-gray-900 leading-none">
              ምዕናም
            </h1>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-sanctuary-400 mt-1">
              Mi’enam
            </span>
          </div>
        </div>

        {/* Actions Section/Avatar */}
        <div className="flex items-center gap-5">
          {/* Spiritual Divider */}
          <div className="hidden md:block">
            <p className="text-[12px] font-medium text-sanctuary-300 uppercase tracking-widest italic">
              እስመ አልቦ ነገር • ዘይሰአኖ ለእግዚአብሔር
            </p>
          </div>

          <div className="h-4 w-px bg-sanctuary-100 mx-2" />

          <AvatarDropdown user={serialize(user)} />
        </div>
      </div>

      {/*  Bottom Border */}
      <div className="hidden md:block h-px w-full bg-linear-to-r from-transparent via-sanctuary-300 to-transparent opacity-50" />
    </header>
  );
}
