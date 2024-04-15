import { Sidebar } from '@/components/sidebar/sidebar'
import { Inter } from 'next/font/google'
import styles from './styles.module.scss'
import { AdminNavbars } from '@/components/navbar/AdminNavbar';
import { TimeFormatProvider } from '@/context/TimeFormatProvider';
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
                <AdminNavbars className={styles.nav} />
                <TimeFormatProvider>
                    <div className={styles.main}>
                        {children}
                    </div>
                </TimeFormatProvider>
            </div>
        </>
    )
}
