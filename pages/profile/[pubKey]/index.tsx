import Layout from "../../../components/dashboard/profile/layout";
import styles from "../../../styles/pages/Profile.module.scss";
import type { ReactElement } from "react";

export default function Profile() {
  return <div className={styles.container}>No data found</div>;
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
