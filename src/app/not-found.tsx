import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="text-center space-y-8 max-w-xl">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.5em] text-sanctuary-300 font-bold">
            404 Error
          </p>

          <h1 className="font-serif italic text-6xl text-gray-900">
            Lost in the Sanctuary
          </h1>

          <p className="text-sanctuary-400 leading-relaxed">
            The manuscript you seek does not exist or has faded from memory.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-sanctuary-700 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-sanctuary-800 transition-all"
        >
          Return to Treasury
        </Link>
      </div>
    </main>
  );
}
