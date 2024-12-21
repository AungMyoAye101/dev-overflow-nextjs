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

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();
  return (
    <nav className="flex justify-between items-center p-4 md:px-12 fixed top-0 z-50 w-full bg-lignht-gray dark:bg-dark-gray text-light-gray dark:text-light-gray">
      <div className="text-2xl font-poppins font-bold">
        <Link href="/">
          <span className="text-dark-gray dark:text-light-gray ">Dev</span>
          <span className="text-orange">Overflow</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Menubar className="relative bg-transparent border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="border-none rounded-full p-0 focus:bg-light-gray focus:text-dark-gray data-[state=open]:bg-light-gray data-[state=open]:text-dark-gray dark:focus:bg-dark-gray dark:focus:text-light-gray dark:data-[state=open]:bg-dark-gray dark:data-[state=open]:text-light-gray">
              {mode === "dark" ? (
                <Image
                  src={"/assets/icons/moon.svg"}
                  alt="moon icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={"/assets/icons/sun.svg"}
                  alt="sun icon"
                  width={20}
                  height={20}
                  className=""
                />
              )}
            </MenubarTrigger>
            <MenubarContent className=" absolute top-4 -right-8 min-w-40">
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
                    <Image
                      src={items.icon}
                      alt={items.label}
                      width={20}
                      height={20}
                    />
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
      </div>
    </nav>
  );
};

export default NavBar;
