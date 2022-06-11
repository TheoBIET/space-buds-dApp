import Layout from '../components/dashboard/layout';
import styles from '../styles/pages/Profile.module.scss';
import type { ReactElement } from 'react';

export default function Settings() {
    return (
        <div>
            Settings Component OK!
        </div>
    )
}

Settings.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;