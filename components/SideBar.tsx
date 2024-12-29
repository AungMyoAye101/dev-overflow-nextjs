import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { sideLinks } from "@/constants";

const SideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center ">
        <FaBars className="text-dark-gray dark:text-light-gray text-lg" />
      </SheetTrigger>
      <SheetContent side={"left"} className="foucs:none  p-4 h-screen">
        <SheetHeader className=" text-left">
          <SheetTitle>
            <Link href="/" className="font-bold text-xl font-poppins">
              <span className="text-dark-gray dark:text-light-gray ">Dev</span>
              <span className="text-orange ml-0.5">Overflow</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4 h-full">
          {sideLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="text-lg font-noto_serif flex items-center gap-2 rounded-md bg-light-gray dark:bg-dark-gray hover:text-orange p-2"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          <div className=" flex flex-col justify-end gap-2 ">
            <button className="text-rose-600 text-lg font-noto_serif flex items-center gap-2 p-2  bg-light-gray dark:bg-dark-gray rounded-md">
              <FaSignOutAlt />
              <span>LogOut</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
