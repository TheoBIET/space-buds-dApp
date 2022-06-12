import Sidebar from "../sidebar";
import Discover from "../discover";
import Header from "./header";
import styles from "../../../styles/layouts/Dashboard.module.scss";
import type { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div id={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        {children}
      </div>
      <Discover />
    </div>
  );
}
