import { PostSkeleton } from "@/src/features/posts/components/post-skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 1. Ghost Header Area */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse" />
          <div className="w-32 h-8 bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
      </div>

      {/* 2. Ghost Greeting */}
      <div className="space-y-2">
        <div className="w-48 h-4 bg-gray-100 rounded-md animate-pulse" />
        <div className="w-64 h-10 bg-gray-100 rounded-md animate-pulse" />
      </div>

      {/* 3. Ghost Filter Row */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-100 rounded-full animate-pulse flex-shrink-0"
          />
        ))}
      </div>

      {/* 4. The Grid of Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
