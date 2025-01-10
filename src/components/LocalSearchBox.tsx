"use client";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { filteredSearch } from "@/src/constants";
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
  }, [search, router, path, query, searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="bg_dark_white flex-1 flex items-center shadow  px-2 py-1 rounded-lg gap-2 ">
          <IoSearchOutline className="text-xl text-gray-500 " />
          <Input
            value={search}
            placeholder="Search anything globally"
            className="border-none foucs:outline-none focus:ring-0 focus-visible:ring-0 bg-transparent"
            onChange={handleInputChange}
          />
        </div>
        <div className="block lg:hidden">
          <Select>
            <SelectTrigger className="font-poppins font-semibold w-fit px-4 py-2 ">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {filteredSearch.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-4 font-poppins text-lg font-semibold ">
        {filteredSearch.map((item) => (
          <Button
            key={item}
            value={item}
            className="bg_dark_white text-dark-gray dark:text-light-gray shadow-md dark:shadow-none hover:btn-bg"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LocalSearchBox;
