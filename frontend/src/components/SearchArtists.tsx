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
        setItems(response.data.search);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [searchTerm]);

  return (
    <>
      <ul>
        {items?.map((item) => {
          return (
            <li key={item.title}>
              <a href={`https://wikidata.org/wiki/${item.id}`}>
                <p>{item.label}</p>
              </a>
              {item.description}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SearchArtists;
