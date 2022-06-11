import Layout from '../components/dashboard/layout';
import styles from '../styles/pages/Profile.module.scss';
import type { ReactElement } from 'react';

export default function Timeline() {
    return (
        <div>
            Timeline Component OK!
        </div>
    )
}

Timeline.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;