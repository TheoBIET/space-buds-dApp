import Layout from '../components/dashboard/layout';
import styles from '../styles/pages/Profile.module.scss';
import type { ReactElement } from 'react';

export default function Calendar() {
    return (
        <div>
            Calendar Component OK!
        </div>
    )
}

Calendar.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;