import type { SearchResult } from "@/lib/types/search";

export default async function searchByName(
  query: string,
): Promise<SearchResult> {
  const res = await fetch(`/api/search?name=${query}`);
  if (!res.ok) {
    throw new Error(`Search request failed: ${res.status}`);
  }
  return res.json();
}
