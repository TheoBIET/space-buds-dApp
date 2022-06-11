import Layout from '../components/landing/layout';
import styles from '../styles/pages/Home.module.scss';
import type { ReactElement } from 'react';

export default function Landing() {
  return (
    <div className={styles.container}>
    </div>
  )
}

Landing.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;