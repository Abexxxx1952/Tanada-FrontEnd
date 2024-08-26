"use client";
import { PropsWithChildren } from "react";
import { withProviders } from "./providers/index";
import styles from "./styles.module.css";

export type AppType = (props: PropsWithChildren) => JSX.Element;

function App({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}
export default withProviders(App);
