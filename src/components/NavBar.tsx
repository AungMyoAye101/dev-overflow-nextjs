"use client";
import Link from "next/link";
import { useTheme } from "./Theme";
import { themeOptions } from "@/src/constants";
import { FaMoon, FaSun } from "react-icons/fa";
import SideBar from "./SideBar";
import Image from "next/image";

import { FaBars, FaX } from "react-icons/fa6";
import { useState } from "react";
import { useSession } from "@/src/components/AuthProvider";
import { Button } from "@/src/components/ui/button";

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSession();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="sticky top-8 z-50 mb-8 flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/85 px-4 py-3 shadow-lg shadow-primary/5 backdrop-blur md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12">
            <Image
              src={"/assets/images/logo.svg"}
              width={26}
              height={26}
              alt="site logo"
            />
          </div>
          <div className="min-w-0">
            <p className="font-poppins text-lg font-extrabold tracking-tight text-foreground">
              DevOverflow
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Ask, answer, and grow together
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-border/70 bg-card p-1 sm:flex">
            {themeOptions.map((item) => {
              const isActive = mode === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  className={`rounded-full px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setMode(item.value)}
                  aria-label={`Switch to ${item.label} mode`}
                >
                  <span className="flex items-center gap-2">
                    {item.value === "dark" ? (
                      <FaMoon />
                    ) : item.value === "light" ? (
                      <FaSun />
                    ) : (
                      item.icon
                    )}
                    <span className="hidden md:inline">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground transition hover:border-primary/30 hover:text-primary sm:hidden"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mode === "dark" ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <Link
              href={`/profile/${user._id}`}
              className="hidden items-center gap-3 rounded-full border border-border/70 bg-card px-2 py-2 sm:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">Profile</p>
              </div>
            </Link>
          ) : (
            <Button asChild className="hidden rounded-full px-5 sm:inline-flex">
              <Link href="/sign-in">Log in</Link>
            </Button>
          )}

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground transition hover:border-primary/30 hover:text-primary lg:hidden"
            onClick={handleClick}
            type="button"
            aria-label="Open navigation"
          >
            {isOpen ? (
              <FaX className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </div>
      </nav>
      {isOpen && <SideBar handleClick={handleClick} />}
    </>
  );
};

export default NavBar;
