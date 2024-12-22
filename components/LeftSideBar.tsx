"use client";

import { sideLinks } from "@/constants";
import Link from "next/link";

import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const LeftSideBar = () => {
  return (
    <section className="hidden sm:block fixed top-12  bottom-0 left-0 bg-light-gray dark:bg-dark-gray p-4  min-w-fit  max-w-60 z-10 rounded-r-md">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 ">
          {sideLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="text-lg font-noto_serif flex items-center gap-2 rounded-md border border-gray-500  hover:bg-orange p-2"
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
