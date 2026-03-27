import type { Metadata } from "next";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import AppShell from "@/src/components/AppShell";
import AuthProvider from "@/src/components/AuthProvider";
import LeftSideBar from "@/src/components/LeftSideBar";
import NavBar from "@/src/components/NavBar";
import RightSideBar from "@/src/components/RightSideBar";
import ThemeProvider from "@/src/components/Theme";
import { Toaster } from "@/src/components/ui/toaster";
import { getCurrentUser } from "@/src/lib/auth/session";
import "./globals.css";
import "../styles/prism.css";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: "DevSyncMM",
  description: "Ask , answer and grow together",
  icons: "/assets/images/logo.svg",
};
// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap',
// });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: any = await getCurrentUser();
  const initialUser = user
    ? {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      picture: user.picture,
    }
    : null;

  return (
    <html lang="en" className={cn("font-sans")}>
      <body className="bg-background text-foreground">
        <Suspense fallback={null}>
          <AuthProvider initialUser={initialUser}>
            <ThemeProvider>
              <AppShell
                standalone={children}
                shell={
                  <div className="bg-background text-foreground  mx-auto flex min-h-screen w-full max-w-7xl  flex-col px-4 pb-8 md:px-6 xl:px-8">
                    <NavBar />
                    <div className=" grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)_300px] ">
                      <LeftSideBar />
                      <main className="py-4 ">{children}</main>
                      <RightSideBar />
                    </div>
                  </div>
                }
              />
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
