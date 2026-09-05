import axios from "axios";
import React, { useEffect, useState } from "react";

interface ListProps {
  searchTerm: string;
}

function SearchArtists({ searchTerm }: ListProps) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/search?name=${searchTerm}`)
      .then((response) => {
        setItems(response.data.query.search);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [searchTerm]);

  return (
    <>
      <ul>
        {items.map((item) => {
          const allMatches = item.snippet.replace(/<[^>]+>/g, "").split("\n");
          const uniqueMatches = [...new Set(allMatches)];
          const finalSnippet = uniqueMatches.join(", ");
          return (
            <li key={item.title}>
              <a href={`https://wikidata.org/wiki/${item.title}`}>
                <p>{item.title}</p>
              </a>
              {finalSnippet}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SearchArtists;
