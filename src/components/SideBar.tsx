"use client";
import React from "react";
import Link from "next/link";
import { sideLinks } from "@/src/constants";
import AuthActions from "@/src/components/AuthActions";
import { useSession } from "@/src/components/AuthProvider";
import { usePathname } from "next/navigation";

const SideBar = ({ handleClick }: { handleClick: () => void }) => {
  const { user } = useSession();
  const pathname = usePathname();
  return (
    <div className="fixed inset-0 z-60 bg-black/35 lg:hidden" onClick={handleClick}>
      <div
        className="h-full w-[min(22rem,90vw)] bg-background p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="mb-4 px-2">
              <p className="text-xl font-bold tracking-tight">
                DevSyncMM
              </p>
              <p className="text-sm text-muted-foreground">
                Browse the platform
              </p>
            </div>
            {sideLinks.map((link, index) => (
              <Link
                href={
                  link.href === "/profile"
                    ? user
                      ? `/profile/${user._id}`
                      : "/sign-in"
                    : link.href === "/collection" && !user
                      ? "/sign-in"
                      : link.href
                }
                key={index}
                className={`sideBar-links ${(pathname.includes(link.href) && link.href.length > 1) ||
                    pathname === link.href
                    ? "active-link"
                    : ""
                  }`}
                onClick={handleClick}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
            <AuthActions mobile onNavigate={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
