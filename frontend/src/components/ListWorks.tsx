import axios from "axios";
import React, { useEffect, useState } from "react";

interface ListProps {
  searchTerm: string;
}

function ListWorks({ searchTerm }: ListProps) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/list?itemId=${searchTerm}`)
      .then((response) => {
        setItems(response.data.results.bindings);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [searchTerm]);

  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.item.value}>
            <a href={item.item.value}>{item.itemLabel.value}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListWorks;
