import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import SearchBar from "./components/SearchBar";
// import ListWorks from "./components/ListWorks";
import SearchArtists from "./components/SearchArtists";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ThemeToggle />
      <SearchBar onChange={setSearchTerm} />
      <SearchArtists searchTerm={searchTerm} />
    </ThemeProvider>
  );
}

export default App;
