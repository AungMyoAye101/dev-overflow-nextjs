"use client";

import { sideLinks } from "@/src/constants";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <section className="  overflow-hidden hidden sm:block sticky top-0 pt-[7rem] px-4 pb-10 h-screen   left-0 bg-white dark:bg-gray-900  sm:w-fit md:min-w-60  ">
      <div className="flex flex-col justify-between  h-full">
        <div className="flex flex-col gap-4 ">
          {sideLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`side-links  ${
                pathname === link.href ? "active-link" : ""
              }`}
            >
              <span className="text-lg ">{link.icon}</span>
              <span className="hidden md:block">{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col  gap-2 ">
          <Link
            href={"/sign-in"}
            className={`side-links  ${
              pathname === "login" ? "active-link" : ""
            }`}
          >
            <FaSignInAlt />
            <span className="hidden md:block">Log in</span>
          </Link>
          <Link
            href={"/sign-up"}
            className={`side-links  ${
              pathname === "signup" ? "active-link" : ""
            }`}
          >
            <FaUserPlus className="text-lg" />
            <span className="hidden md:block">Sign up</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
