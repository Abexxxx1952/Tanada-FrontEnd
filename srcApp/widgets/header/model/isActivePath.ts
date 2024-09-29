import { HEADER_ITEMS } from "@/srcApp/shared/constants/header-list";

export function isActivePath(pathname: string, elemPath: string) {
  if (elemPath === "/") {
    const isHeaderItemPath = HEADER_ITEMS.slice(1).some((item) =>
      pathname.startsWith(item.path)
    );
    if (isHeaderItemPath) {
      return false;
    }
  }

  if (pathname.startsWith(elemPath)) {
    return true;
  }

  return false;
}
