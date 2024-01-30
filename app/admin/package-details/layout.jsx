"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';



export default function PackageDetails({ children }) {

    return (
        <>
            <div className={styles.container}>
              {children}
            </div>

        </>
    )
}
