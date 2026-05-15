"use client";

import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePostAction } from "../actions/delete-post.action";

export default function SinglePost({
  post,
  html,
}: {
  post: any;
  html: string;
}) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deletePostAction(post._id);
      if (result.success) {
        toast.success("The reflection has returned to the silence.");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 500);
      } else {
        toast.error("The manuscript could not be removed.");
        setIsDeleting(false);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      setIsDeleting(false);
    }
  }

  return (
    <main className="w-full min-h-screen bg-transparent selection:bg-sanctuary-100">
      {/* 1. Fixed Navigation    */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-6 pointer-events-none">
        <Link
          href="/dashboard"
          className="pointer-events-auto group flex items-center gap-3 text-sanctuary-400 hover:text-sanctuary-800 transition-all duration-700"
        >
          <div className="p-2 rounded-full bg-white/70 backdrop-blur-md border border-sanctuary-100/50 group-hover:shadow-xl group-hover:scale-110 transition-all">
            <ArrowLeft size={16} strokeWidth={1.2} />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold hidden sm:block">
            Back to Treasury
          </span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-2">
          <Link
            href={`/dashboard/edit/${post._id}`}
            className="p-2 rounded-full bg-white/70 backdrop-blur-md border border-sanctuary-100/50 text-sanctuary-400 hover:text-sanctuary-700 hover:shadow-md transition-all"
            title="Edit Manuscript"
          >
            <Edit3 size={16} strokeWidth={1.2} />
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
            className="p-2 rounded-full bg-white/70 backdrop-blur-md border border-sanctuary-100/50 text-sanctuary-400 hover:text-red-400 hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Trash2 size={16} strokeWidth={1.2} />
          </button>
        </div>
      </nav>

      {/* 2. The Manuscript Article */}
      <article className="w-full max-w-3xl mx-auto px-5 sm:px-6 pt-40 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out wrap-break-word overflow-x-hidden">
        <header className="mb-24 text-center space-y-8">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.5em] text-sanctuary-300 font-bold">
              {post.category || "Uncategorized"}
            </span>
            <div className="w-8 h-px bg-sanctuary-100" />
            <p className="text-sanctuary-400 italic font-serif text-sm">
              {date}
            </p>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-gray-900 italic leading-[1.1] tracking-tight wrap-break-word  px-2">
            {post.title}
          </h1>
        </header>

        {/* 3. The Pure Content */}
        <div
          className="ProseMirror readonly-content mx-auto w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* 4. Signature Footer */}
        <footer className="mt-48 pb-20 flex flex-col items-center text-center space-y-10">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-sanctuary-200 to-transparent" />
          <div className="space-y-2">
            <span className="text-sanctuary-200 font-serif italic text-5xl tracking-widest select-none">
              ምዕናም
            </span>
            <p className="text-[9px] uppercase tracking-[0.6em] text-sanctuary-300 font-bold">
              The Sanctuary Studio
            </p>
          </div>
        </footer>
      </article>

      {/* 5. Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-sanctuary-900/20 backdrop-blur-sm modal-overlay-fade"
            onClick={() => !isDeleting && setShowConfirm(false)}
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-[32px] shadow-sanctuary p-10 text-center space-y-8 modal-content-pop">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl italic text-gray-900 leading-tight">
                Letting go of this thought?
              </h2>
              <div className="w-8 h-px bg-sanctuary-100 mx-auto" />
            </div>

            <p className="text-sm text-sanctuary-400 leading-relaxed px-2">
              This action is permanent. Once dissolved, the manuscript will not
              return to the treasury.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-sanctuary-400 border border-sanctuary-100 rounded-full hover:bg-sanctuary-50 transition-all duration-300 disabled:opacity-50"
              >
                Keep it
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold bg-red-50 text-red-700 border border-red-100 rounded-full hover:bg-red-100 transition-all duration-300 min-w-[120px] disabled:opacity-50"
              >
                {isDeleting ? "Dissolving..." : "Dissolve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
