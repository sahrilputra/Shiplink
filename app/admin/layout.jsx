import { Sidebar } from '@/components/sidebar/sidebar'
import { Inter } from 'next/font/google'
import styles from './styles.module.scss'
import { Navbar } from '@/components/navbar/Navbar';
import { ArrivalIcon, VerificationIcon } from '@/components/sidebar/icon/adminIcon';
const inter = Inter({ subsets: ['latin'] })
import { AdminSidebar } from '@/components/sidebar/AdminSidebar';
export const metadata = {
    title: 'Shiplink Workspace',
    description: 'Canada\'s best package forwarding service | Backoffice playgroud',
}

export default function BackofficeLayout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <AdminSidebar />
                </div>
                <Navbar className={styles.nav} />
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </>
    )
}
