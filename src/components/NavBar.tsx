"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "./Theme";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/components/ui/menubar";
import { themeOptions } from "@/src/constants";
import { FaMoon, FaSun } from "react-icons/fa";
import SideBar from "./SideBar";
import Image from "next/image";

import GlobalSearch from "./GlobalSearch";

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();

  return (
    <nav className="border-2 flex justify-between items-center gap-4  px-4 py-3 fixed top-0 z-[1000] w-full bg-white dark:bg-gray-900 shadow-md dark:shadow-none">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={"/assets/icons/site-logo.svg"}
          width={20}
          height={20}
          alt="site logo"
        />
        <div className="hidden sm:block text-2xl font-poppins font-bold">
          <span className="text-dark-gray dark:text-light-gray ">Dev</span>
          <span className="text-orange ml-0.5">Overflow</span>
        </div>
      </Link>
      <GlobalSearch />
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
