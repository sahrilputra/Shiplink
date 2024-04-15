import React from "react"
import styles from '../styles.module.scss'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DateForm } from "./components/DateForm"
export default function Payment() {

    return (
        <div className={styles.carrier}>
            <div className={`${styles.carrier__container} flex flex-col items-start w-[100%]`}>
                <p className="font-semibold text-sm">Date Setting</p>
                <div className="w-full mt-2 px-3">
                    <DateForm />
                </div>
            </div>
        </div>
    )
}