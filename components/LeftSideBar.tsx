"use client";

import { sideLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <section className="  overflow-hidden hidden sm:block sticky top-0 pt-20 px-4 pb-10 h-screen   left-0 bg-light-gray dark:bg-dark-gray  sm:w-fit md:min-w-60  ">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 ">
          {sideLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`text-lg font-noto_serif flex items-center gap-2 rounded-md border border-gray-500  hover:bg-orange p-2 ${
                pathname === link.href ? "active-link" : ""
              }`}
            >
              <span>{link.icon}</span>
              <span className="hidden md:block">{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col  gap-2 ">
          <button className=" text-lg font-noto_serif flex items-center gap-2 p-2 border border-gray-500   hover:bg-orange rounded-md">
            <FaSignInAlt />
            <span className="hidden md:block">Sign In</span>
          </button>
          <button className="text-rose-600 text-lg font-noto_serif flex items-center gap-2 p-2 border border-gray-500 hover:bg-orange rounded-md">
            <FaSignOutAlt />
            <span className="hidden md:block">LogOut</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
