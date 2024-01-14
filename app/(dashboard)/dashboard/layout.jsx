
import React from 'react';
import { Sidebar } from '@/components/sidebar/sidebar'
import styles from './styles.module.scss';
import { Navbar } from '@/components/navbar/Navbar';
import { PromoOne } from '@/components/ads/promoOne';
import { SearchIcon } from '@/components/icons/iconCollection';
import { PromoTwo } from '@/components/ads/promoTwo';
import { ForwadPakage } from './components/dashboardMenus/ForwadPakage';
import { Button } from '@/components/ui/button';
export const metadata = {
    title: 'ShipLink',
    description: 'Canada\'s best package forwarding service',
}

export default function DashboardMenu({ children }) {

    return (
        <>
            <div className={styles.container}>
                {children}
            </div >
        </>
    )
}
