'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { HistoryIcon } from 'lucide-react'
import { ItemTable } from './components/ItemTable/ItemsTable'

export default function BinManagementPage() {

    return (
        <>
            <div className={styles.packageItems}>
                <div className={styles.packageHeader}>
                    <div className={styles.packageBanner}>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Package Items</h1>
                            <p className=" text-blue-900 text-sm font-light ">Unassigned | 10 Items  </p>
                        </div>
                        <div className="icon px-3">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex flex-row gap-2"
                            >
                                <HistoryIcon width={15} height={15} />
                                <p className='text-xs'>History</p>

                            </Button>
                        </div>
                    </div>
                </div>

                <div className={`${styles.itemTable} px-2 py-2`}>
                    <ItemTable />
                </div>
            </div>
        </>
    )
}
