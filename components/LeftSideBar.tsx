"use client";

import { sideLinks } from "@/constants";
import { createTest, createUser } from "@/lib/actions/create.user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const LeftSideBar = () => {
  const pathname = usePathname();
  const user = {
    clerkId: "clerk11223",
    name: "Alice Johnson",
    username: "alicej",
    email: "alicej@example.com",
    password: "alice123secure",
    bio: "Tech enthusiast and backend developer.",
    picture: "https://example.com/images/alicejohnson.jpg",
    location: "Seattle, WA",
    protfolio: "https://alicejohnson.dev",
    reputation: 200,
    saved: [],
    joinedAt: "2021-11-10T09:20:00.000Z",
  };

  const text = "testing";
  const create = async () => {
    try {
      const res = await createTest(text);
    } catch (err) {
      console.log(err);
    }
  };

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
          <button onClick={create}>Create</button>
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
