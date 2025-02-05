import { useSeriesActions } from "@/hooks/useSeriesActions";
import { userQueryOptions } from "@/services/auth.services";
import { searchSeriesById } from "@/services/search.services";
import { getSeriesById } from "@/services/series.services";
import { formatSeries } from "@/utils/utils";
import type { TSeries, TSeriesSearch } from "@server-models/series.model";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import DetailedContent from "./DetailedContent";
import { DetailedPageSkeleton } from "./ui/skeleton-detailed";

interface SeriesPageProps {
  id: string;
  saved: boolean;
}

export default function SeriesPage({ id, saved }: SeriesPageProps) {
  const { data: userData } = useQuery(userQueryOptions);
  const { addSeries, deleteSeries } = useSeriesActions();

  const {
    data: series,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [saved ? "library-series" : "search-series", id],
    queryFn: () => (saved ? getSeriesById(id) : searchSeriesById(id)),
  });

  if (isLoading) {
    return <DetailedPageSkeleton />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const handleAdd = () => {
    if (!userData) {
      toast.error("You must be logged in to add to your list");
      return;
    }

    addSeries.mutate({
      seriesData: series as TSeriesSearch,
      userId: userData.user.id,
    });
  };

  const handleDelete = () => {
    deleteSeries.mutate((series as TSeries)._id.toString());
  };

  return (
    <DetailedContent
      media={formatSeries(series!)}
      saved={saved}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
