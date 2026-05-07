import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8 space-y-8">
      {/* Header Skeleton */}
      <div className="relative p-8 sm:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-blue to-blue-900">
        <div className="flex items-center gap-5">
          <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white/20" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 bg-white/20" />
            <Skeleton className="h-4 w-48 bg-white/20" />
          </div>
        </div>
      </div>
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
      {/* Bookings Skeleton */}
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
}

export { Skeleton };
