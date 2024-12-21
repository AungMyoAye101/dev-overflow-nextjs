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

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();
  return (
    <nav className="flex justify-between items-center p-4 md:px-10 bg-gray-800 text-white fixed top-0 z-50 w-full">
      <div className="text-2xl font-poppins font-bold">
        <Link href="/">
          <span>Dev</span>
          <span className="text-orange">Overflow</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Menubar className="relative">
          <MenubarMenu>
            <MenubarTrigger>
              {mode === "dark" ? "dark" : "light"}
            </MenubarTrigger>
            <MenubarContent className=" absolute top-4 -right-8 w-fit">
              <MenubarItem onClick={() => setMode("light")}>Light</MenubarItem>

              <MenubarSeparator />
              <MenubarItem onClick={() => setMode("dark")}>Dark</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>System</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;
