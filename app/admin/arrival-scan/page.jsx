'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { ArrivalForms } from './components/Forms'
import { Button } from '@/components/ui/button'
import { DeclareContet } from './components/Table/DeclareContet'
import { Separator } from '@/components/ui/separator'
import { RegisterDialog } from './components/Dialog/RegistedDialog'
export default function ArrivalScanPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.forms}>
                <ArrivalForms />
                <div className="w-full py-4">
                    <Separator className="h-[2px]" />
                </div>
                <div className="">
                    <p className='py-1 px-2 text-sm'>Optional Declare Content</p>
                    <DeclareContet setOpen={setOpen} />
                    <RegisterDialog open={open} setOpen={setOpen} />
                </div>
            </div>
        </>
    )
}
