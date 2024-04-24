import React from "react"
import styles from './styles.module.scss'


export const metadata = {
    title: 'ShipLink Admin Login',
    description: 'Login to ShipLink Admin Panel',
}

export default function AdminLoggedIn({ children }) {


    return (
        <>
            <div className={styles.mains}>
                {children}
            </div>
        </>
    )
}