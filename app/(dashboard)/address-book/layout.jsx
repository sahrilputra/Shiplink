import React from 'react';
import styles from './styles.module.scss';


export const metadata = {
    title: 'ShipLink',
    description: 'Manage your addresses and create new ones.',
}

export default function AddressBook({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
