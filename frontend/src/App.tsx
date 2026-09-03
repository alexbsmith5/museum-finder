import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("/list?itemId=Q5593")
      .then((response) => {
        setItems(response.data.results.bindings);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <>
      <h1>Hello World</h1>
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

export default App;
