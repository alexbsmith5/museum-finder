import { useState } from "react";

import Input from "./components/Input";
import List from "./components/List";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Input onChange={setSearchTerm} />
      <List searchTerm={searchTerm} />
    </>
  );
}

export default App;
