export interface SearchResultItem {
  title: string;
  label: string;
  description?: string;
}

export interface SearchResult {
  search: SearchResultItem[];
}
