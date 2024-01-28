'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { InvoiceTable } from './components/invoiceTable'
export default function ArrivalScanPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.forms}>
                <div className="">
                    <InvoiceTable />
                </div>
            </div>
        </>
    )
}
