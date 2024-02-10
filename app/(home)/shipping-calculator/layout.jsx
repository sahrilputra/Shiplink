import React from "react"
import styles from '../../styles.module.scss'
import { HomeNavbar } from "@/components/home/navigation/HomeNavbar"
import { HomeFooter } from "@/components/home/navigation/HomeFooter"
export default function AdminLoggedIn({ children }) {
    return (
        <>
            <div className={styles.mains}>
                {children}
            </div>
        </>
    )
}