

import Link from "next/link";
import { extractPlainText } from "../utils/extract-plain-text";
import { Ellipsis, Calendar, Feather, BookOpen, PenTool } from "lucide-react";




interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: any; // TipTap JSON Object
  isDraft: boolean;
  createdAt: string;
}

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="mt-24 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-1000">
        <div className="w-16 h-16 bg-sanctuary-50 rounded-full flex items-center justify-center text-sanctuary-200 mb-6 shadow-inner">
          <Feather size={28} strokeWidth={1} className="animate-pulse" />
        </div>
        <h3 className="text-xl font-serif italic text-sanctuary-800">
          The silence is waiting, Etsub...
        </h3>
        <p className="text-xs text-sanctuary-400 mt-3 max-w-[250px] tracking-wide leading-relaxed">
          No manuscripts have ascended yet. Shall we capture a new reflection?
        </p>
      </div>
    );
  }

  return (
    /* Grid */
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-8 pb-20">
      {posts.map((post, index) => {
        const previewText = extractPlainText(post.content);

        return (
          <div
            key={post._id}
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "both",
            }}
            className="group relative flex flex-col bg-white/70 backdrop-blur-sm 
                       p-4 md:p-7 rounded-[24px] md:rounded-[32px] border border-white 
                       shadow-[0_4px_15px_rgb(0,0,0,0.03)] 
                       hover:shadow-[0_20px_40px_rgba(var(--sanctuary-600-rgb),0.12)] 
                       hover:-translate-y-1.5 transition-all duration-500 ease-out 
                       animate-in fade-in slide-in-from-bottom-8"
          >
            {/* Category & Status */}
            <div className="flex items-center justify-between mb-3 md:mb-5">
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 md:px-3 md:py-1 bg-sanctuary-50 text-sanctuary-600 rounded-full">
                {post.category}
              </span>
              <button className="text-sanctuary-200 hover:text-sanctuary-800 transition-colors">
                <Ellipsis size={16} className="md:w-5 md:h-5" />
              </button>
            </div>

            {/* Content Link */}
            <Link
              href={`/dashboard/read/${post.slug}`}
              className="flex-1 group/link"
            >
              <h3 className="text-sm md:text-xl font-serif italic text-gray-900 leading-tight group-hover/link:text-sanctuary-600 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              {/*  */}
              <p className="text-[10px] md:text-sm text-gray-400 line-clamp-2 md:line-clamp-3 leading-relaxed font-light">
                {previewText || "A moment captured..."}
              </p>
            </Link>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 md:mt-6 pt-3 md:pt-5 border-t border-sanctuary-50/80">
              <div className="flex items-center gap-1.5 text-sanctuary-300">
                <Calendar size={10} className="md:w-3 md:h-3" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {post.isDraft && (
                <PenTool size={10} className="text-amber-400 md:w-3 h-3" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
