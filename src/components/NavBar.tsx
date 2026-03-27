"use client";
import Link from "next/link";
import { useTheme } from "./Theme";
import { themeOptions } from "@/src/constants";
import SideBar from "./SideBar";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "@/src/components/AuthProvider";
import { Button } from "@/src/components/ui/button";
import { LogIn, Menu, Moon, Sun, X } from "lucide-react";
import { DevSyncIcon } from "../assets/icons/logo";

const NavBar: React.FC = () => {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSession();
  const handleClick = () => {
    console.log("clicl", mode)
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background py-4 ">
      <nav className=" flex items-center justify-between gap-4 rounded-2xl border border-border  px-4 py-2 shadow-lg shadow-primary/5 bg-background md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <DevSyncIcon className="text-primary w-10 h-10" />
          <div className="min-w-0">
            <p className="uppercase font-semibold tracking-[0.3em]  hidden sm:block text-primary">
              Devsyncmm
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block ">
              Ask, answer, and grow together
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">


          <Button
            size={'icon'}
            variant={'outline'}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full cursor-pointer"
          >
            {mode === "dark" ? <Moon /> : <Sun />}
          </Button>
          <Button
            size={'icon'}
            onClick={handleClick}
            aria-label="toggle side bar"
            className="rounded-full flex justify-center items-center md:hidden font-medium text-xl transition-all duration-300"
          >
            {
              isOpen ? <X /> : <Menu />
            }

          </Button>


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
            <Button asChild className="hidden rounded-full  md:flex">
              <Link href="/login"><LogIn />Log in</Link>
            </Button>
          )}

        </div>
      </nav>
      {isOpen && <SideBar handleClick={handleClick} />}
    </header>
  );
};

export default NavBar;
