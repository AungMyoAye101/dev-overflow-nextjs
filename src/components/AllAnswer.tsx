import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { filteredSearch } from "../constants";
const AllAnswer = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="h3-bold text-orange">128 Answers</h2>
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
  );
};

export default AllAnswer;
