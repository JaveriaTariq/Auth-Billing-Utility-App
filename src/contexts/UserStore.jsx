/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const UserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      userType: "new",
      setUserType: (userType) => set({ userType }),
    }),
    {
      name: "userStorage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export const headerWithToken = (token) => {
  const jwtToken = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};
