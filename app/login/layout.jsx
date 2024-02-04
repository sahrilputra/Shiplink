import React from "react"
import styles from '../styles.module.scss'
export default function AdminLoggedIn({ children }) {
    return (
        <>
            <div className={styles.mains}>
                {children}
            </div>
        </>
    )
}