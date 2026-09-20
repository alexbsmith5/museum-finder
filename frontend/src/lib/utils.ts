export { cn } from "cn";
import axios from "axios";

export type Search = {
  id: string;
  label: string;
  description?: string;
};

export const fetchSearch = async (searchTerm: string): Promise<Search[]> => {
  const response = await axios.get<{ search: Search[] }>(
    `/api/search?name=${searchTerm}`,
  );
  return (response.data.search || []).map(({ id, label, description }) => ({
    id,
    label,
    description,
  }));
};
