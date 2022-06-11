import Layout from '../components/dashboard/layout';
import styles from '../styles/pages/Profile.module.scss';
import type { ReactElement } from 'react';

export default function Raffles() {
    return (
        <div>
            Raffles Component OK!
        </div>
    )
}

Raffles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;