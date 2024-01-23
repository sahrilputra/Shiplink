'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { FilterIcons } from '@/components/icons/iconCollection'
import { HistoryTable } from './components/HistoryTable'
export default function page() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className="top">
                        <h1 className='m-2 text-xl font-bold'>Billing History</h1>
                        <p className='text-zinc-500 text-sm font-normal p-3'> Manage Your Billing Information </p>
                    </div>

                    <div className="mid px-3 py-5">
                        <div className="left flex flex-row justify-end items-end gap-5">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <FilterIcons fill="#CC0019" />
                            </Button>
                        </div>
                    </div>
                    <HistoryTable />
                </div>
            </div >
        </>
    )
}
