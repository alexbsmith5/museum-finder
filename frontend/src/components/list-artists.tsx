"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { fetchSearch, type Search } from "@/lib/utils";

interface ListProps {
  searchTerm: string;
}

function ListArtists({ searchTerm }: ListProps) {
  const [items, setItems] = useState<Search[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setItems([]);
      return;
    }

    fetchSearch(searchTerm)
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.log("Error fetching artists: ", error);
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
