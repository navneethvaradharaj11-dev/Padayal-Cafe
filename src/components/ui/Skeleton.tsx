export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-earth-200 rounded ${className}`} />
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="card p-4">
      <div className="aspect-video rounded-lg bg-earth-100 mb-4">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-video bg-earth-100">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
