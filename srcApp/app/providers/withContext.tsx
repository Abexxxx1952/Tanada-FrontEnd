"use client";
import { createContext, useState } from "react";
import { PropsWithChildren } from "react";

import type { AppType } from "../app";
import { UserFromServer } from "@/srcApp/entities/user/model/types";

interface AppContextType {
   user: UserFromServer | null;
  setUser: React.Dispatch<React.SetStateAction<UserFromServer | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const withContextProvider =
  (App: AppType) =>
  ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<UserFromServer | null>(null);

    return (
      <AppContext.Provider value={{ user, setUser }}>
        <App>{children}</App>
      </AppContext.Provider>
    );
  };
