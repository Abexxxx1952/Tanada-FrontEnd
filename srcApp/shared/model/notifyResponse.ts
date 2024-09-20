import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { ErrorData } from "@/srcApp/shared/model/types";
import { toast } from "react-toastify";

export function notifyResponse<T>(
  responseResult: T | undefined | ErrorData,
  successMessage: string
): void {
  if (isErrorData(responseResult)) {
    toast.error(
      `Error: ${responseResult.status} ${
        responseResult.statusText
      }. Massage: ${JSON.stringify(responseResult)}`,
      {
        position: "top-right",
      }
    );
  }

  if (responseResult !== undefined) {
    toast.success(successMessage, {
      position: "top-right",
    });
  }
}
