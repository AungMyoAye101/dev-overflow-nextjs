import React from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 md:px-10 bg-gray-800 text-white sticky top-0 z-50 w-full">
      <div className="">
        <Link href="/">Dev-Overflow</Link>
      </div>
      <div className="">
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
