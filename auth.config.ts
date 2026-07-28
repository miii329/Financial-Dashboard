import type { NextAuthConfig } from "next-auth";
import { defaultLocale, localizedPath, stripLocale } from "@/app/lib/i18n";

export const authConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { locale, pathname } = stripLocale(nextUrl.pathname);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = pathname.startsWith("/dashboard");
      const isOnLogin = pathname === "/login";

      if (nextUrl.pathname === "/login") {
        return Response.redirect(new URL(localizedPath(defaultLocale, "/login"), nextUrl));
      }

      if (nextUrl.pathname === "/dashboard") {
        return Response.redirect(new URL(localizedPath(defaultLocale, "/dashboard"), nextUrl));
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        const loginUrl = new URL(localizedPath(locale, "/login"), nextUrl);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
        return Response.redirect(loginUrl);
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL(localizedPath(locale, "/dashboard"), nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
