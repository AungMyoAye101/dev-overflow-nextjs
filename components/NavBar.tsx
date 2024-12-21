"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "./Theme";

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();
  return (
    <nav className="flex justify-between items-center p-4 md:px-10 bg-gray-800 text-white fixed top-0 z-50 w-full">
      <div className="">
        <Link href="/">Dev-Overflow</Link>
      </div>
      <div className="flex items-start gap-4">
        <button onClick={() => setMode("dark")}>dark</button>
        <button onClick={() => setMode("light")}>light</button>

        <UserButton />
        <Link href="/signin">
          <SignInButton />
        </Link>
        <Link href="/signout">
          <SignOutButton />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
