import { Search } from "lucide-react";

interface SearchPostsProps {
  currentTitle?: string;
}

export default function DashboardSearch({ currentTitle }: SearchPostsProps) {
  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-left-10 duration-1000 delay-100">
      <form action="/dashboard" method="get" className="relative group">
        <input
          type="text"
          name="title"
          defaultValue={currentTitle || ""}
          placeholder="Search your reflections..."
          className="
            w-full px-7 py-4 pr-14 
            rounded-2xl border-none bg-white/60 backdrop-blur-md
            text-sanctuary-900 placeholder:text-sanctuary-300 placeholder:italic
            shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500
            focus:outline-none focus:ring-2 focus:ring-sanctuary-200 focus:bg-white
            group-hover:shadow-md
          "
        />
        <button
          type="submit"
          className="
            absolute right-2 top-1/2 -translate-y-1/2 
            w-11 h-11 flex items-center justify-center 
            rounded-xl bg-sanctuary-600 text-white
            shadow-lg shadow-sanctuary-200 transition-all duration-300
            hover:bg-sanctuary-700 hover:-translate-y-[55%] active:scale-95
          "
        >
          <Search size={18} strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}
