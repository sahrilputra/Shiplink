"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { VerificationMenus } from './components/menus/VerificationMenus';


export default function VerificationLayout({ children }) {

    return (
        <>
            <div className={styles.container}>
              {children}
            </div>

        </>
    )
}
