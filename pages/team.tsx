import Layout from '../components/landing/layout';
import type { ReactElement } from 'react';

export default function Team() {
    return (
        <div>
            Team Component OK!
        </div>
    )
}

Team.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;