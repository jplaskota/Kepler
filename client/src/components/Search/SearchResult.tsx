import { MovieSearch } from "@server-models/movie.model";
import { SeriesSearch } from "@server-models/series.model";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";
import SearchItemCard from "./SearchItemCard";

interface SearchResultProps {
  results: {
    movies: MovieSearch[];
    series: SeriesSearch[];
  };
}

export default function SearchResult({ results }: SearchResultProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the top of the search results
  useEffect(() => {
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [results]);

  // Construct movies
  const movies = results.movies.map((movie) => (
    <SearchItemCard key={movie.id} item={movie} />
  ));

  // Construct series
  const series = results.series.map((series) => (
    <SearchItemCard key={series.id} item={series} />
  ));

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="w-fit flex flex-col gap-4" ref={searchContainerRef}>
        <div className="w-fit max-w-[90vw] h-fit grid grid-cols-3 sm:grid-cols-4 gap-2">
          {movies}
        </div>
        <Separator orientation="horizontal" />
        <div className="w-fit max-w-[90vw] h-fit grid grid-cols-3 sm:grid-cols-4 gap-2">
          {series}
        </div>
      </div>
    </div>
  );
}
