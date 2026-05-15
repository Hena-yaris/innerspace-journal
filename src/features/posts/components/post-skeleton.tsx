



// 3. The Skeleton  loading
export  function PostSkeleton() {
  return (
    <div className="flex flex-col bg-gray-50/50 p-3 md:p-5 rounded-2xl md:rounded-[24px] border border-gray-100 h-[160px] md:h-[200px]">
      <div className="w-16 h-4 bg-gray-200 rounded-md animate-pulse mb-3" />
      <div className="space-y-2 flex-1">
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-md animate-pulse" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="w-full h-3 bg-gray-100 rounded-md animate-pulse" />
        <div className="w-5/6 h-3 bg-gray-100 rounded-md animate-pulse" />
      </div>
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50">
        <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-16 h-3 bg-gray-200 rounded-md animate-pulse" />
      </div>
    </div>
  );
}