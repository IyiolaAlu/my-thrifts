import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
    return (
        <div className="animate-pulse rounded-lg overflow-hidden border">
            <div className="bg-gray-200 aspect-square w-full" />
            <div className="p-4 flex flex-col gap-2">
                <Skeleton className="bg-gray-200 h-4 rounded w-3/4" />
                <Skeleton className="bg-gray-200 h-4 rounded w-1/2" />
                <Skeleton className="bg-gray-200 h-4 rounded w-1/4" />
                <Skeleton className="bg-gray-200 h-8 rounded w-full mt-2" />
            </div>
        </div>
    )
}