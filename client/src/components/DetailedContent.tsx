import { TFormattedMovie, TFormattedSeries } from "@/types/media.types";
import { cn } from "@/utils/utils";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface DetailedContentProps {
  media: TFormattedMovie | TFormattedSeries;
  saved: boolean;
  onDelete: () => void;
  onAdd: () => void;
}

export default function DetailedContent({
  media,
  saved,
  onDelete,
  onAdd,
}: DetailedContentProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="flex md:max-w-[1200px] max-md:flex-col gap-4 p-3 mx-4 mb-4 font-Montserrat">
      {imageLoading && <Skeleton className="aspect-[8/12] w-full" />}
      <img
        src={import.meta.env.VITE_IMAGE_BASE_URL + media.poster_path}
        alt="poster"
        loading="lazy"
        className={cn(imageLoading && "h-0 w-0", "md:max-h-[600px] rounded-md")}
        onLoad={() => setImageLoading(false)}
        crossOrigin="anonymous"
      />
      <div className="flex flex-col-reverse md:flex-col justify-between items-end gap-8 font-Montserrat">
        {saved ? (
          <nav className="flex gap-2 items-center sm:gap-4">
            <Button>Archive</Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete()}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </nav>
        ) : (
          <Button size="icon" onClick={() => onAdd()}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        )}
        <article>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 font-Anton text-5xl sm:text-6xl lg:text-8xl">
                {media.title.toUpperCase()}
              </p>
              <div className="flex gap-2 text-md sm:text-xl font-montserrat">
                <p>[ {media.year.split("-")[0]} ]</p>
                <p>[ {media.details} ]</p>
                <p>[ {media.vote_average} ]</p>
              </div>
            </div>
            <Separator />
            <p>{media.overview}</p>
            <Separator />
            <p>[ {media.genres.join(" ] [ ")} ]</p>
            <Separator />
          </div>
        </article>
      </div>
    </Card>
  );
}
