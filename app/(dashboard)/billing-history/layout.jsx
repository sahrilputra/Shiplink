import React from 'react';
import styles from './styles.module.scss';


export const metadata = {
    title: 'ShipLink',
    description: 'Canada\'s best package forwarding service',
}

export default function billingHistoryLayout({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
