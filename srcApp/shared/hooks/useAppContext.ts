import { useContext } from "react";
import { AppContext } from "@/srcApp/app/providers/withContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useSAppContext must be used within a ContextProvider");
  }
  return context;
};
