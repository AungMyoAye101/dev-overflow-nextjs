"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import SearchResult from "./SearchResult";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formQuery, removeFormQuery } from "../lib/utils";

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");
  const resultContainer = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => {
      if (
        resultContainer.current &&
        //@ts-expect-error becasuse the contains mathod is exited.
        !resultContainer.current.contains(event?.target)
      ) {
        setSearch("");
        setIsOpen(false);
      }
    };

    setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [path]);

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
    return () => clearTimeout(debounceQueryFn);
  }, [search, router, path, query, searchParams]);

  return (
    <div
      className="relative max-w-2xl flex-1 flex items-center px-2 py-1 rounded-lg  shadow bg-primary-white dark:bg-black-card"
      ref={resultContainer}
    >
      <IoSearchOutline className="text-xl  " />
      <Input
        type="text"
        placeholder="Search anything globally"
        className="border-none foucs:outline-none focus:ring-0 focus-visible:ring-0"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!isOpen) setIsOpen(true);

          if (e.target.value === "" && isOpen) {
            setIsOpen(false);
          }
        }}
      />
      {isOpen && <SearchResult />}
    </div>
  );
};

export default GlobalSearch;
