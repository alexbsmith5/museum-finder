"use client";
import { useState } from "react";

import Search from "@/components/search";
import ListArtists from "@/components/list-artists";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Search onChange={setSearchTerm} />
      <ListArtists searchTerm={searchTerm} />
    </>
  );
}
