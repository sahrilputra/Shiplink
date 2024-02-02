'use client'
import React, { useState } from 'react'
import styles from '../../styles.module.scss'
import data from '../../../../../data/admin/LotsDetailsData.json'
import { LotsDetailsTable } from '../../components/DestinationTabled/LotsDetailsTable'
export default function DestinationLotsPage() {

    return (
        <>
            <div className={styles.carrier}>
                <div className={styles.leftTabled}>
                    <LotsDetailsTable data={data} />
                </div>
            </div>
        </>
    )
}
