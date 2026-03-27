"use client";

import React, { useEffect } from "react";
import { SessionUser, useAuthStore } from "@/src/store/auth-store";

const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: SessionUser | null;
}) => {
  const hydrateUser = useAuthStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser(initialUser);
  }, [hydrateUser, initialUser]);

  return <>{children}</>;
};

export const useSession = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  return {
    user,
    isAuthenticated,
    setUser,
  };
};

export default AuthProvider;

