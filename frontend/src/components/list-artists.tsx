"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface ListProps {
  searchTerm: string;
}

function ListArtists({ searchTerm }: ListProps) {
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
      <div className="flex flex-col gap-4 text-sm">
        {items?.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-1.5">
              <div className="leading-none font-medium">
                <a href={`https://wikidata.org/wiki/${item.id}`}>
                  <p>{item.label}</p>
                </a>
              </div>
              <div className="text-muted-foreground">{item.description}</div>
              <Separator />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ListArtists;
