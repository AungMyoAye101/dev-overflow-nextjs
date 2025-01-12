"use client";

import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import SearchResult from "./SearchResult";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formQuery, removeFormQuery } from "../lib/utils";

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const debounceQueryFn = setTimeout(() => {
      if (search) {
        const newUrl = formQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeFormQuery({
            params: searchParams.toString(),
            keyToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
  }, [search, router, path, query, searchParams]);

  return (
    <div className="relative max-w-2xl flex-1 flex items-center px-2 py-1 rounded-lg bg_dark_white shadow secondary_bg ">
      <IoSearchOutline className="text-xl text-gray-500 " />
      <Input
        type="text"
        placeholder="Search anything globally"
        className="border-none foucs:outline-none focus:ring-0 focus-visible:ring-0"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!open) setOpen(true);

          if (e.target.value === "" && open) {
            setOpen(false);
          }
        }}
      />
      {open && <SearchResult />}
    </div>
  );
};

export default GlobalSearch;
