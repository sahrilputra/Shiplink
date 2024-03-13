'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { UserForms } from './components/forms/UserForms'
import axios from 'axios'
export default function Page() {

    const [user, setUser] = useState({})
    async function fetchData() {
        try {
            const response = await axios.get('/api/customerAPI/account/details')
            console.log("🚀 ~ fetchData ~ response:", response)
            setUser(response.data.data)
            console.log("🚀 ~ fetchData ~ response:", response)
        } catch (error) {
            console.log("🚀 ~ Page ~ error:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // console.log("🚀 ~ Page ~ user:", user)


    console.log("🚀 ~ Page ~ user:", user)
    return (
        <>
            <div className={styles.content}>
                <div className={styles.wrapperForm}>
                    <div className="forms w-full">
                        <UserForms data={user} />
                    </div>
                </div>
            </div>
        </>
    )
}
