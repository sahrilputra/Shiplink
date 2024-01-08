import { Sidebar } from '@/components/sidebar/sidebar'
import { Inter } from 'next/font/google'
import styles from './styles.module.scss';
import { Navbar } from '@/components/navbar/Navbar';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'ShipLink',
    description: 'Canada\'s best package forwarding service',
}

export default function DashboardLayout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <Sidebar className={styles.sidebar} />
                <div className={styles.main}>
                    <Navbar />
                    {children}
                </div>
            </div>


        </>
    )
}
