import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filteredSearch } from "@/constants";

const LocalSearchBox: React.FC = () => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div
          className=" flex-1 flex items-center shadow bg-gray-5
        0 dark:bg-dark-gray px-2 py-1 rounded-lg "
        >
          <IoSearchOutline className="text-xl text-gray-500 " />
          <Input
            type="text"
            placeholder="Search anything globally"
            className="border-none foucs:outline-none focus:ring-0 focus-visible:ring-0"
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
            className="bg-gray-50 dark:bg-dark-gray text-dark-gray dark:text-light-gray shadow-md dark:shadow-none hover:btn-bg"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LocalSearchBox;
