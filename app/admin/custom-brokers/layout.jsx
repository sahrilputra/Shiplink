"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { CustomMenus } from './components/ConfigMenus'

export default function CustomBrokerLayout({ children }) {

    return (
        <>
            <div className={styles.container}>
                {children}
            </div>

        </>
    )
}
