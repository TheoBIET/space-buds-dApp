import Layout from '../components/landing/layout';
import type { ReactElement } from 'react';

export default function Roadmap() {
    return (
        <div>
            Roadmap Component OK!
        </div>
    )
}

Roadmap.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;