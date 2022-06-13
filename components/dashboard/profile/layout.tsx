import Sidebar from "../sidebar";
import Discover from "../discover";
import Header from "./header";
import styles from "../../../styles/layouts/Dashboard.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const pubKey = router.query.pubKey;

    // if (pubKey === 'undefined') {
    //   router.push("/timeline");
    // }
  });

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
