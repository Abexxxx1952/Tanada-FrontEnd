import { ErrorData } from "@/srcApp/shared/model/types";

export function isErrorData(error: unknown): error is ErrorData {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in error
  );
}
