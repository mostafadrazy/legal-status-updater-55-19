import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCard() {
  return (
    <div className="rounded-xl overflow-hidden glass-card p-6 space-y-4 animate-in fade-in-50">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  )
}