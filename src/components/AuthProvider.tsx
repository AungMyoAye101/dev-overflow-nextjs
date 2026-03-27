"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export interface SessionUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  setUser: (user: SessionUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: SessionUser | null;
}) => {
  const [user, setUser] = useState<SessionUser | null>(initialUser);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSession = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useSession must be used within AuthProvider");
  }

  return context;
};

export default AuthProvider;
