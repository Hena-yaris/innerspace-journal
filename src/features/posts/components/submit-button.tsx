import { useFormStatus } from "react-dom";
import { Loader2, PenTool, Send } from "lucide-react";

type SubmitProps = {
  isDraft: boolean;
  isEditing: boolean;
};

export default function SubmitButton({ isDraft, isEditing }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-14 py-5 bg-sanctuary-700 hover:bg-sanctuary-900 text-white rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 group overflow-hidden relative disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {pending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : isDraft ? (
        <PenTool size={18} />
      ) : (
        <Send size={18} />
      )}

      <span className="uppercase tracking-[0.3em] text-[10px] font-bold">
        {pending
          ? "Preserving..."
          : isEditing
            ? "Update Manuscript"
            : "Release to the Light"}
      </span>
    </button>
  );
}
