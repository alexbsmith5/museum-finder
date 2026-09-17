import { Input } from "@/components/ui/input";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ input, onChange }: InputProps) => {
  return (
    <>
      <Input
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type here..."
      />
    </>
  );
};

export default Search;
