"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

export default function CustomClearanceLayout({ children }) {

    return (
        <>
            <div className={styles.container}>
              {children}
            </div>

        </>
    )
}
