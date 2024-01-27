'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import data from '../../../../data/admin/TransportLotsData.json'
import { SingleItemsTable } from '../components/TransportTabled/SingleItemTable'
import { AssingLotsDialog } from '../components/AssignLotsDialog/AssignToLotsDialog'
import { LotsItemsTable } from '../components/TransportTabled/LotsItemTable'
export default function TransportPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>

                </div>

                <div className={`${styles.listTable} flex flex-col gap-1`}>
                    <LotsItemsTable data={data} setOpen={setOpen} isOpen={open} />
                </div>
                <AssingLotsDialog open={open} setOpen={setOpen} />
            </div>
        </>
    )
}
