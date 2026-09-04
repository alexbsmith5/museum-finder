import { useState } from "react";

import SearchBar from "./components/SearchBar";
import ListWorks from "./components/ListWorks";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <SearchBar onChange={setSearchTerm} />
      <ListWorks searchTerm={searchTerm} />
    </>
  );
}

export default App;
