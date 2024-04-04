import React from "react"
import styles from '../styles.module.scss'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PaymentForms } from "./components/paymentForms"
import { STMPTForms } from "./components/STMPTForms"
import { SCACForm } from "./components/SCACForm"
export default function Payment() {

    return (
        <div className={styles.carrier}>
            <div className={`${styles.carrier__container} flex flex-col items-start w-[100%]`}>
                <p className="font-semibold text-sm">Payment API</p>
                <div className="w-full mt-2 px-3">
                    <PaymentForms />
                </div>
            </div>
            <div className={`${styles.carrier__container} flex flex-col items-start w-[100%]`}>
                <p className="font-semibold text-sm">SMTP Email</p>
                <div className="w-full mt-2 px-3">
                    <STMPTForms />
                </div>
            </div>
            <div className={`${styles.carrier__container} flex flex-col items-start w-[100%]`}>
                <p className="font-semibold text-sm">SCAC Code</p>
                <div className="w-full mt-2 px-3">
                    <SCACForm />
                </div>
            </div>
        </div>
    )
}