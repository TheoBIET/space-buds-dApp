import Layout from '../components/dashboard/layout';
import styles from '../styles/pages/Profile.module.scss';
import type { ReactElement } from 'react';

export default function Staking() {
    return (
        <div>
            Staking Component OK!
        </div>
    )
}

Staking.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;