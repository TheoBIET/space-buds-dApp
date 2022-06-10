import Layout from '../components/landing/layout';
import styles from '../styles/pages/Home.module.scss';

export default function Landing() {
  return (
    <div className={styles.container}>
    </div>
  )
}

Landing.getLayout = (page) => <Layout>{page}</Layout>;