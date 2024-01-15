import { Sidebar } from '@/components/sidebar/sidebar'
import { Poppins } from 'next/font/google'
import styles from './styles.module.scss';
import { Navbar } from '@/components/navbar/Navbar';
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200']
})

export const metadata = {
    title: 'ShipLink',
    description: 'Canada\'s best package forwarding service',
}

export default function DashboardLayout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <Navbar className={styles.nav} />
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </>
    )
}
