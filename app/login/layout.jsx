import React from "react"
import styles from '../styles.module.scss'
import { HomeNavbar } from "@/components/home/navigation/HomeNavbar"
export default function AdminLoggedIn({ children }) {
    return (
        <>
            <div className={styles.mains}>
                <HomeNavbar />
                {children}
            </div>
        </>
    )
}