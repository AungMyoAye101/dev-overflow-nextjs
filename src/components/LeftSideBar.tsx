"use client";

import { sideLinks } from "@/src/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/src/components/AuthProvider";
import AuthActions from "@/src/components/AuthActions";
const LeftSideBar = () => {
  const { user } = useSession();
  const pathname = usePathname();
  console.log(pathname)

  const handleNavigate = (link: string) => {
    let url = "/";

    if (link === "/profile") {
      url = user ? `/profile/${user._id}` : "/sign-in";
    } else if (link === "/collection") {
      url = user ? link : "/sign-in";
    } else {
      url = link;
    }
    return url;
  };

  return (
    <aside className=" sticky top-24 hidden h-fit lg:block border border-border  rounded-xl shadow-2xl overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="shadow_rounded bg-card p-4">
        <div className="mb-4">
          <p className=" text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Navigation
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {sideLinks.map((link, index) => (
            <Link
              href={handleNavigate(link.href)}
              key={index}
              className={`sidebar-link  ${(pathname.includes(link.href) && link.href.length > 1) ||
                pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "bg-sidebar-accent text-sidebar-accent-foreground "
                }`}
            >
              <span >{link.icon}</span>
              <span className="hidden md:block">{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 border-t border-borderr pt-4 ">
          <AuthActions />
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
