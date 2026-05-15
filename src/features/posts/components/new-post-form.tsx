"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import {
  Send,
  FileText,
  ChevronDown,
  Feather,
  Check,
  X,
  Sparkles,
  PenTool,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import SubmitButton from "./submit-button";

// Dynamic import for TipTap editor (SSR disabled)
const TiptapEditor = dynamic(() => import("../editor/tiptap-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[350px] bg-white/10 animate-pulse rounded-2xl border border-sanctuary-100/50" />
  ),
});

export default function NewPostForm({
  categories: initialCategories,
  action,
  post, //pass the existing post data
}: any) {
  //1, initialize state with existing post data if it exists
  const [content, setContent] = useState<any>(post?.content || null);
  const [isDraft, setIsDraft] = useState(post ? post.isDraft : true);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(
    post?.category || "",
  );

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const confirmNewCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed) {
      setCategories([...categories, trimmed]);
      setSelectedCategory(trimmed);
      setIsAddingNew(false);
      setNewCategory("");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10 selection:bg-sanctuary-100 animate-in fade-in duration-1000">
      {/*  The Return Path */}
      <nav className="w-full max-w-3xl mb-4 self-center">
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-3 text-sanctuary-400 hover:text-sanctuary-700 transition-all duration-500"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-sanctuary-100 group-hover:shadow-md group-hover:scale-110 transition-all">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            Return to Sanctuary
          </span>
        </Link>
      </nav>

      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-xl rounded-[40px] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.05)] p-8 md:p-16 border border-white">
        {/* Watermark for the Brand */}
        <div className="absolute top-8 right-10 text-sanctuary-100 select-none pointer-events-none">
          <span className="text-4xl font-serif italic">ምዕናም</span>
        </div>

        {/*Header: The Identity */}
        <div className="mb-16 text-center space-y-5">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-sanctuary-200 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-white p-4 rounded-2xl text-sanctuary-600 shadow-sm border border-sanctuary-50">
                <Feather size={28} strokeWidth={1.2} className="-rotate-45" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif italic text-gray-900 tracking-tight">
              {post ? "Refining the Thought" : "New Reflection"}
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-sanctuary-400 font-bold">
              ሄኖክ • The Sanctuary Studio
            </p>
          </div>
        </div>

        <form action={action} className="space-y-14">
          {/* If  editing, we need to send the ID so the server knows which post to update*/}
          {post && (
            <input type="hidden" name="postId" value={post._id.toString()} />
          )}

          {/*  Title*/}
          <div className="space-y-3">
            <label className="text-[9px] uppercase tracking-[0.3em] text-sanctuary-400 font-bold ml-1">
              Title of the Piece
            </label>
            <input
              name="title"
              required
              autoFocus
              defaultValue={post?.title || ""} //Prefill title
              placeholder="What is the spirit unfolding?..."
              className="w-full bg-transparent border-b border-sanctuary-100 pb-6 text-3xl md:text-5xl font-serif italic text-gray-900 focus:outline-none focus:border-sanctuary-400 transition-all duration-700 placeholder:text-sanctuary-200"
            />
          </div>

          {/* Collection */}
          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-[0.3em] text-sanctuary-400 font-bold ml-1">
              Select Collection
            </label>
            <div className="relative">
              {!isAddingNew ? (
                <div className="relative group">
                  <select
                    name="category"
                    value={selectedCategory}
                    onChange={(e) =>
                      e.target.value === "ADD_NEW"
                        ? setIsAddingNew(true)
                        : setSelectedCategory(e.target.value)
                    }
                    required
                    className="w-full appearance-none bg-white/40 border border-sanctuary-100 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-sanctuary-50 transition-all text-sanctuary-700 font-medium cursor-pointer"
                  >
                    <option value="" disabled>
                      Choose a world...
                    </option>
                    {categories.map((cat: string) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option
                      value="ADD_NEW"
                      className="font-bold text-sanctuary-600"
                    >
                      + Create New Collection
                    </option>
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-sanctuary-300 pointer-events-none"
                    size={18}
                  />
                </div>
              ) : (
                <div className="flex gap-2 animate-in zoom-in-95 duration-300">
                  <input
                    autoFocus
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && confirmNewCategory()}
                    placeholder="Name your collection..."
                    className="flex-1 bg-white border border-sanctuary-300 rounded-2xl px-6 py-4 text-sanctuary-700 focus:outline-none focus:ring-4 focus:ring-sanctuary-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={confirmNewCategory}
                    className="bg-sanctuary-600 text-white px-5 rounded-2xl hover:bg-sanctuary-700 transition-all"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="bg-white border border-sanctuary-100 text-sanctuary-300 px-5 rounded-2xl hover:bg-red-50 hover:text-red-400 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/*  Manuscript The Work */}
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-[9px] uppercase tracking-[0.3em] text-sanctuary-400 font-bold">
                Manuscript
              </label>
              <span
                className={`text-[9px] flex items-center gap-2 italic tracking-widest transition-opacity duration-700 ${isSaving ? "text-sanctuary-500" : "text-sanctuary-200"}`}
              >
                <Sparkles
                  size={10}
                  className={isSaving ? "animate-spin-slow" : ""}
                />
                {isSaving ? "CAPTURING THOUGHTS..." : "WORDS PRESERVED"}
              </span>
            </div>

            <div className="group relative rounded-[32px] bg-white/40 border border-sanctuary-100 focus-within:border-sanctuary-300 focus-within:bg-white transition-all duration-1000 p-6 md:p-10 shadow-sm focus-within:shadow-xl">
              <TiptapEditor
                initialContent={post?.content} // Prefill content
                onChange={(json) => {
                  setContent(json);
                  setIsSaving(true);
                  setTimeout(() => setIsSaving(false), 2000);
                }}
              />
              <input
                type="hidden"
                name="content"
                value={content ? JSON.stringify(content) : ""}
              />
            </div>
          </div>

          {/* Footer: The Ascent */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 pt-10 border-t border-sanctuary-50">
            {/*  Toggle Styled */}
            <button
              type="button"
              onClick={() => setIsDraft(!isDraft)}
              className="flex items-center gap-5 group"
            >
              <div
                className={`w-14 h-7 rounded-full transition-all duration-700 relative p-1 ${isDraft ? "bg-sanctuary-600" : "bg-gray-200"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-500 ease-out ${isDraft ? "translate-x-7" : ""}`}
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 group-hover:text-sanctuary-700 transition-colors">
                  Draft Mode
                </span>
                <span className="text-[9px] italic text-sanctuary-200">
                  Private Reflection
                </span>
              </div>
            </button>

            <input
              type="hidden"
              name="isDraft"
              value={isDraft ? "true" : "false"}
            />

            {/* The Final Button */}
            <SubmitButton isDraft={isDraft} isEditing={!!post} />
          </div>
        </form>
      </div>
    </div>
  );
}
