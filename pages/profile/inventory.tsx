import Layout from "../../components/dashboard/profile/layout";
import styles from "../../styles/pages/Profile.module.scss";
import type { ReactElement } from "react";

export default function Inventory() {
  return <div className={styles.container}>Inventory</div>;
}

Inventory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
