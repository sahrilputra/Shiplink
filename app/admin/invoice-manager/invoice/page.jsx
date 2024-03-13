'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { InvoiceForms } from '../components/forms/newInvoiceForms';
export default function ArrivalScanPage() {
    const [open, setOpen] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('customer');
    console.log("🚀 ~ ArrivalScanPage ~ myParam:", myParam)
    return (
        <>
            <div className={styles.forms}>
                <InvoiceForms customer={myParam} />
            </div>
        </>
    )
}
