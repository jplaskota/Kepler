import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { Series } from "@server-models/series.model";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface SeriesCardProps {
  item: Series;
  search?: boolean;
}

export default function SeriesCard({ item }: SeriesCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const posterUrl = import.meta.env.VITE_IMAGE_BASE_URL + item.poster_path;

  return (
    <Card className="sm:w-[300px] mb-4 select-none animate-fade-in">
      <CardHeader className="p-3 sm:p-4">
        {loading && <Skeleton className="aspect-[8/12] w-full" />}
        <img
          src={posterUrl}
          alt="poster"
          loading="lazy"
          className={cn(loading && "h-0 w-0", "w-full")}
          onLoad={() => setLoading(false)}
        />
        <CardTitle className="font-Anton text-2xl sm:text-4xl sm:pt-1">
          {item.name.toUpperCase()}
        </CardTitle>
        <div className="flex gap-1 max-sm:text-xs">
          <CardDescription className="max-sm:text-xs">
            [ {item.first_air_date.split("-")[0]} ]
          </CardDescription>
          <CardDescription className="max-sm:text-xs">
            [ {item.number_of_seasons} seasons ]
          </CardDescription>
        </div>
        <CardDescription className="max-sm:text-xs text-balance">
          {item.genres.join(", ")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

// TODO series page with more info
// TODO one line category
