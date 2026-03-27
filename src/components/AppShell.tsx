"use client";

import { usePathname } from "next/navigation";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const AppShell = ({
  standalone,
  shell,
}: {
  standalone: React.ReactNode;
  shell: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthPage) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 md:px-6">
        {standalone}
      </main>
    );
  }

  return <>{shell}</>;
};

export default AppShell;
