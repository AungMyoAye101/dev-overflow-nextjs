"use client";

import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formQuery, removeFormQuery } from "../lib/utils";
import { Search } from "lucide-react";

const LocalSearchBox: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const debounceQueryFn = setTimeout(() => {
      // GUARD 1: Only push if we have a search term AND it's different from the URL
      if (search && search !== query) {
        const newUrl = formQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      }
      // GUARD 2: Only remove the query if the search is empty BUT the URL still has a 'q'
      else if (!search && query) {
        const newUrl = removeFormQuery({
          params: searchParams.toString(),
          keyToRemove: ["q"],
        });
        router.push(newUrl, { scroll: false });
      }

      // If neither condition is met (e.g., initial load where search === "" and query === null),
      // it does nothing, successfully breaking the infinite loop!

    }, 300);

    return () => clearTimeout(debounceQueryFn);
  }, [search, query, router, path, searchParams]); // Added 'query' to dependencies

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="bg_dark_white flex-1 flex items-center shadow  px-2 py-1 rounded-lg gap-2 ">
      <Search className="text-xl text-gray-500 " />
      <Input
        value={search}
        placeholder="Search anything globally"
        className="border-none foucs:outline-none focus:ring-0 focus-visible:ring-0 bg-transparent"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default LocalSearchBox;