import React from 'react'
import styles from './styles.module.scss'
import { ServicesCategory } from './components/ServicesCategory'
export default function ServicesLayout({ children }) {

    return (
        <>
            <div className={styles.container}>

                <div className={styles.category}>
                    <ServicesCategory />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
    )
}
