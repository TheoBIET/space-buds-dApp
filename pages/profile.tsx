import Layout from '../components/dashboard/layout';
import styles from '../styles/pages/Profile.module.scss';
import type { ReactElement } from 'react';

export default function Profile() {
    return (
        <div>
            Profile Component OK!
        </div>
    )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;