import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

const SideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <FaBars className="text-dark-gray dark:text-light-gray text-lg" />
      </SheetTrigger>
      <SheetContent side={"left"} className="foucs:none  p-4">
        <SheetHeader className=" text-left">
          <SheetTitle>
            <Link href="/" className="font-bold text-xl font-poppins">
              <span className="text-dark-gray dark:text-light-gray ">Dev</span>
              <span className="text-orange ml-0.5">Overflow</span>
            </Link>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
