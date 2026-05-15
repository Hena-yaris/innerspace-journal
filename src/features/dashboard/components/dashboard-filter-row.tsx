"use client";

import { useRouter } from "next/navigation";

type FilterRowProps = {
  activeFilter: string;
  categories: string[];
};

export default function DashboardFilterRow({ activeFilter, categories }: FilterRowProps) {
  const router = useRouter();

  const handleClick = (item: string) => {
    if (item === "All") {
      router.push("/dashboard");
    } else if (item === "Drafts") {
      router.push("/dashboard?draft=true");
    } else {
      router.push(`/dashboard?category=${item}`);
    }
  };

  return (
    <div className="mt-10 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1 items-baseline">
        {categories.map((item) => {
          const isActive = activeFilter === item;

          return (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className={`
                whitespace-nowrap transition-all duration-500 ease-out relative group
                ${
                  isActive
                    ? "text-sanctuary-700 text-lg font-serif italic"
                    : "text-sanctuary-400 text-sm font-medium hover:text-sanctuary-600"
                }
              `}
            >
              {item}
              {isActive && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-sanctuary-600 rounded-full animate-in zoom-in-x duration-500" />
              )}
              {!isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-sanctuary-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
