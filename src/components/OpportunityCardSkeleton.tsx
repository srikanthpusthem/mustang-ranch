import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OpportunityCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Summary */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        
        {/* Meta row */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Risk badge */}
        <Skeleton className="h-6 w-16 rounded-full" />
        
        {/* Highlights */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
