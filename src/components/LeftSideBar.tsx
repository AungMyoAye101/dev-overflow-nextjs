"use client";

import { sideLinks } from "@/src/constants";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
const LeftSideBar = () => {
  const { userId: clerkId } = useAuth();
  const pathname = usePathname();

  const handleNavigate = (link: string) => {
    let url = "/";

    if (link === "/profile") {
      url = clerkId ? `/profile/${clerkId}` : "/sign-in";
    } else if (link === "/collection") {
      url = clerkId ? link : "/sign-in";
    } else {
      url = link;
    }
    return url;
  };

  return (
    <section className="dark:bg-[#161625]  overflow-hidden hidden sm:block sticky top-0 pt-[7rem] px-4 pb-10 h-screen   left-0  sm:w-fit md:min-w-60  ">
      <div className="flex flex-col justify-between  h-full">
        <div className="flex flex-col gap-4 ">
          {sideLinks.map((link, index) => (
            <Link
              href={handleNavigate(link.href)}
              key={index}
              className={`side-links  ${
                (pathname.includes(link.href) && link.href.length > 1) ||
                pathname === link.href
                  ? "active-link"
                  : ""
              }`}
            >
              <span className="text-lg ">{link.icon}</span>
              <span className="hidden md:block">{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col  gap-2 ">
          {clerkId ? (
            <SignOutButton>
              <button className="side-links text-rose-500">
                <GoSignOut />
                <span className="hidden md:block">Log out</span>
              </button>
            </SignOutButton>
          ) : (
            <>
              {" "}
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
