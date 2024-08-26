"use client";
import { createContext, useState } from "react";
import { PropsWithChildren } from "react";

import type { AppType } from "../app";
import { UserFromServer } from "@/srcApp/entities/user/model/types";

interface AppContextType {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserFromServer | null;
  setUser: React.Dispatch<React.SetStateAction<UserFromServer | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const withContextProvider =
  (App: AppType) =>
  ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<UserFromServer | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    return (
      <AppContext.Provider
        value={{ dropdownOpen, setDropdownOpen, user, setUser }}
      >
        <App>{children}</App>
      </AppContext.Provider>
    );
  };
