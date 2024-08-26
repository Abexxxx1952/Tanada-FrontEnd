import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "../model/types";

export function isUserFromServer(
  user: UserFromServer | undefined | ErrorData
): user is UserFromServer {
  return (
    typeof user === "object" && user !== null && "id" in user && "email" in user
  );
}
