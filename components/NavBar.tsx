"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "./Theme";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themeOptions } from "@/constants";
import Image from "next/image";
import { FaMoon, FaSun } from "react-icons/fa";
import SideBar from "./SideBar";

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();
  return (
    <nav className="flex justify-between items-center p-4 md:px-12 fixed top-0 z-50 w-full bg-light-gray dark:bg-dark-gray text-light-gray dark:text-light-gray shadow-md dark:shadow-none">
      <div className="text-2xl font-poppins font-bold">
        <Link href="/">
          <span className="text-dark-gray dark:text-light-gray ">Dev</span>
          <span className="text-orange ml-0.5">Overflow</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Menubar className="relative bg-transparent border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className=" border-none rounded-full p-0 focus:bg-light-gray  data-[state=open]:bg-light-gray  dark:focus:bg-dark-gray dark:focus:text-orange dark:data-[state=open]:bg-dark-gray dark:data-[state=open]:text-orange cursor-pointer ">
              {mode === "dark" ? (
                <FaMoon className="text-orange text-lg " />
              ) : (
                <FaSun className="text-orange text-lg " />
              )}
            </MenubarTrigger>
            <MenubarContent className=" absolute top-4 -right-8 min-w-40 w-fit">
              {themeOptions.map((items) => (
                <MenubarItem
                  key={items.value}
                  onClick={() => {
                    setMode(items.value);
                    if (items.value !== "system") {
                      localStorage.theme = items.value;
                    } else {
                      localStorage.removeItem("theme");
                    }
                  }}
                >
                  <div className="flex items-center gap-2 text-md font-noto_serif">
                    {items.icon}
                    <span>{items.label}</span>
                  </div>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="hidden md:block">
          <UserButton />
        </div>
        <div className="block md:hidden">
          <SideBar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
