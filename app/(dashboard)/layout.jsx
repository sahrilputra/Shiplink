'use client'
import { Sidebar } from '@/components/sidebar/sidebar'
import { Poppins } from 'next/font/google'
import styles from './styles.module.scss';
import { Navbar } from '@/components/navbar/Navbar';
import { LayoutProvider } from './LayoutProvider';
import { useMediaQuery } from 'react-responsive';
import { ModalProvider } from '@/context/ModalContext';
// const poppins = Poppins({
//     subsets: ['latin'],
//     weight: ['100', '200']
// })
// export const metadata = {
//     title: 'ShipLink',
//     description: 'Canada\'s best package forwarding service',
// }

export default function DashboardLayout({ children }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTable = useMediaQuery({ query: '(min-width: 1025px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' })

    return (
        <>
            <LayoutProvider>
                    <div className={styles.container}>
                        <div className={`${styles.sidebar}`}>
                            <Sidebar />
                        </div>
                        <Navbar className={styles.nav} />
                        <div className={styles.main}>
                            {children}
                        </div>
                    </div>
            </LayoutProvider>
        </>
    )
}
