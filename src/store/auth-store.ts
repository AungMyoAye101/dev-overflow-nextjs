"use client";

import { create } from "zustand";

export interface SessionUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  setUser: (user: SessionUser | null) => void;
  hydrateUser: (user: SessionUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),
  hydrateUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),
}));
