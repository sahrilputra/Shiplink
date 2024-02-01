'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import data from '../../../../data/admin/LotsDetailsData.json'
import { LotsDetailsTable } from '../components/DestinationTabled/LotsDetailsTable'
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
