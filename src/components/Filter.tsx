"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { FC, useState } from "react";
import { FilterProps } from "../type";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formQuery } from "../lib/utils";

const Filter: FC<FilterProps> = ({ filterArray }) => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("filter");
  const [active, setActive] = useState(query || "");

  const handleFilter = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <>
      <div className="block lg:hidden">
        <Select onValueChange={handleFilter}>
          <SelectTrigger className="font-poppins font-semibold w-fit h-11 px-4 ">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {filterArray.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden lg:flex items-center gap-4 font-poppins text-lg font-semibold ">
        {filterArray.map((item) => (
          <Button
            key={item}
            value={item}
            className={`bg_dark_white text-dark-gray dark:text-light-gray shadow-md dark:shadow-none hover:btn-bg ${
              active === item ? "btn-bg" : ""
            }`}
            onClick={() => handleFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Filter;
