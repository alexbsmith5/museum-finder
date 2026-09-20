import type { SearchResultItem } from "@/lib/types/search";
import SearchResultCard from "@/components/search-result-card";

interface SearchResultsListProps {
  results: SearchResultItem[];
}

export default function SearchResults({ results }: SearchResultsListProps) {
  if (results.length == 0) {
    return <p className="text-sm text-muted-foreground">No results yet.</p>;
  }
  return (
    <div className="grid gap-3">
      {results.map((item, idx) => (
        <SearchResultCard key={`${item.title}-${idx}`} {...item} />
      ))}
    </div>
  );
}
