import Layout from "../../components/dashboard/profile/layout";
import styles from "../../styles/pages/Profile.module.scss";
import type { ReactElement } from "react";

export default function Pictures() {
  return (
      <div className={styles.container}>
          Pictures
    </div>
  );
}

Pictures.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
