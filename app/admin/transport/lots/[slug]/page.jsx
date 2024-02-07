'use client'
import React, { useState } from 'react'
import styles from '../../styles.module.scss'
import data from '../../../../../data/admin/LotsDetailsData.json'
import { LotsItemsTable } from '../../components/TransportTabled/LotsItemTable';
import { AssingLotsDialog } from '../../components/AssignLotsDialog/AssignToLotsDialog';
import { LotsDetailsTable } from '../../components/TransportTabled/LotsDetailsTable';
export default function LotsDetails({ slug }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>

                </div>

                <div className={`${styles.listTable} flex flex-col gap-1`}>
                    <LotsDetailsTable data={data} setOpen={setOpen} isOpen={open} />
                </div>
            </div>
        </>
    )
}