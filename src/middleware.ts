import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "dev_overflow_session";

const protectedPaths = [
  "/collection",
  "/profile/edit",
  "/question",
  "/question/edit",
];

const authPaths = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  const isProtectedPath = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !hasSession) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthPath && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
