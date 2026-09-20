import { useState } from "react";
import SearchBar from "@/components/search-bar";
import SearchResults from "@/components/search-results";
import fetchSearchResults from "@/lib/api";
import type { SearchResultItem } from "@/lib/types/search";
import "./App.css";

function App() {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSearchResults(term);
      setResults(data.search ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <SearchResults results={results} />
    </div>
  );
}

export default App;
