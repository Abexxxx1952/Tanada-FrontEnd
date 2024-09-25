import dynamic from "next/dynamic";

export { MainWithOutUserPage } from "./ui/mainWithOutUser";
export { MainWithUserPage } from "./ui/mainWithUser"; 



/*  export const MainWithUserPage = dynamic(
  () => import("./ui/mainWithUser").then((mod) => mod.MainWithUserPage),
  {
    ssr: false,
  }
); */
 
