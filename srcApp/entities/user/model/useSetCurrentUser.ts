import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { fetchUserDataById } from "@/srcApp/entities/user/api/fetchUserDataById";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isUserFromServer } from "@/srcApp/entities/user/model/isUserFromServer";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

export function useSetCurrentUser(userId: string) {
  const { currentUser, setCurrentUser } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    if (currentUser?.id !== userId && currentUser !== null) {
      (async () => {
        const userOrError: UserFromServer | undefined | ErrorData =
          await fetchUserDataById(userId);

        if (userOrError === undefined) {
          router.push("/");
        }

        if (isErrorData(userOrError)) {
          router.push("/");
        }

        if (isUserFromServer(userOrError)) {
          setCurrentUser(userOrError);
        }
      })();
    }
  }, []);
}
