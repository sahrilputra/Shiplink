import React from 'react';
import styles from './styles.module.scss';


export const metadata = {
    title: 'ShipLink',
    description: 'get support from our team',
}

export default function supportLayout({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
