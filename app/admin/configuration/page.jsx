'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { CarrierList } from './components/CarrierList'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
export default function configuration() {

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <SearchBar />
                        <Button
                            variant="filter"
                            size="icon"
                            className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                            <FilterIcons fill="#CC0019" />
                        </Button>
                    </div>
                    <Button className="px-4"
                        variant="destructive"
                        size="sm">
                        <div className="text-xs font-normal ">Connect New Carrier</div>
                    </Button>
                </div>

                <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                    <CarrierList />
                    <CarrierList />
                    <CarrierList />
                    <CarrierList />
                </div>

            </div>
        </>
    )
}
