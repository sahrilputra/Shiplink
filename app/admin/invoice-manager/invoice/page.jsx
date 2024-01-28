'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { InvoiceForms } from '../components/forms/newInvoiceForms';
export default function ArrivalScanPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.forms}>
                <InvoiceForms />
            </div>
        </>
    )
}
