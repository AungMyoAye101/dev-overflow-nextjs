"use client";
import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { sideLinks } from "@/src/constants";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { FaUserPlus } from "react-icons/fa6";

const SideBar = ({ handleClick }: { handleClick: () => void }) => {
  const { userId } = useAuth();
  return (
    <div className="absolute left-0 top-0 w-96 h-[100vh] z-10 bg-white dark:bg-[#161625] ">
      <div className="flex flex-col justify-between  py-10 px-6 h-full w-full ">
        <div className="flex flex-col gap-2 ">
          <div className="text-2xl font-poppins font-bold py-2 mb-2 text-center">
            <span className="text-dark-gray dark:text-light-gray ">Dev</span>
            <span className="text-accent-blue ml-0.5">Overflow</span>
          </div>
          {sideLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="sideBar-links "
              onClick={handleClick}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {userId ? (
            <SignOutButton>
              <button
                className="sideBar-links w-full bg-rose-500 text-white"
                onClick={handleClick}
              >
                <FaSignOutAlt />
                <span>LogOut</span>
              </button>
            </SignOutButton>
          ) : (
            <>
              <Link
                href={"/sign-in"}
                className="sideBar-links w-full text-accent-blue"
                onClick={handleClick}
              >
                <FaSignInAlt />
                <span>Log in</span>
              </Link>

              <Link
                href={"/sign-up"}
                className="sideBar-links w-full bg-accent-blue text-white"
                onClick={handleClick}
              >
                <FaUserPlus className="text-lg" />
                <span>Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
