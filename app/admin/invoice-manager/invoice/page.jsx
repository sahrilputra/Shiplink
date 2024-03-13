'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { InvoiceForms } from '../components/forms/newInvoiceForms';
import { useSearchParams } from 'next/navigation'

export default function NewInvoice() {
    const searchParams = useSearchParams()
    const myParam = searchParams.get('customer')
    const [open, setOpen] = useState(false);
    console.log("🚀 ~ ArrivalScanPage ~ router:", myParam)
    // const urlParams = new URLSearchParams(window.location.search);
    // const myParam = urlParams.get('customer');
    console.log("🚀 ~ ArrivalScanPage ~ myParam:", myParam)
    return (
        <>
            <div className={styles.forms}>
                <InvoiceForms customer={myParam} />
            </div>
        </>
    )
}
