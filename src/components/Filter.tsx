import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { filteredSearch } from "../constants";
import { FC } from "react";
import { FilterProps } from "../type";
import { Button } from "./ui/button";

const Filter: FC<FilterProps> = ({ filterArray }) => {
  return (
    <>
      <div className="block lg:hidden">
        <Select>
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
            className="bg_dark_white text-dark-gray dark:text-light-gray shadow-md dark:shadow-none hover:btn-bg"
          >
            {item}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Filter;
