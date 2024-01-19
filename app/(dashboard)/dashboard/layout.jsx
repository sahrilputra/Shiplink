
import React from 'react';
import styles from './styles.module.scss';
import { ModalProvider } from '@/context/ModalContext';

// export const metadata = {
//     title: 'ShipLink',
//     description: 'Canada\'s best package forwarding service',
// }

export default function DashboardMenu({ children }) {

    return (
        <>
            <div className={styles.container}>
                    {children}
            </div >
        </>
    )
}
