import Sidebar from "./sidebar";
import styles from "../../styles/layouts/Dashboard.module.scss";
import type { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div id={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
