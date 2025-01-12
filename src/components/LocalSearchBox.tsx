"use client";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formQuery, removeFormQuery } from "../lib/utils";

const LocalSearchBox: React.FC = () => {
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
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeFormQuery({
          params: searchParams.toString(),
          keyToRemove: ["q"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(debounceQueryFn);
  }, [search, router, path, query, searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="bg_dark_white flex-1 flex items-center shadow  px-2 py-1 rounded-lg gap-2 ">
      <IoSearchOutline className="text-xl text-gray-500 " />
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
