'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { VerificationTable } from './components/Table/VerificationTable'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import data from '../../../data/admin/verificationData.json'
import Image from 'next/image'
import { VerificationMenus } from './components/menus/VerificationMenus'
export default function VerificationPages() {

    const [open, setOpen] = useState(false);

    const [selectedTab, setSelectedTab] = useState("All");
    console.log("parent : ", selectedTab)

    const filterData = selectedTab === 'All' ? data : data.filter(item => item.CustomsStatus === selectedTab);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/verification-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Verification</h1>
                            <p className=" text-blue-900 text-xs font-normal">Showing Verification Items</p>
                        </div>
                    </div>
                    <div className={`${styles.menus}`}>
                        <VerificationMenus selectedTab={setSelectedTab} isSelected={selectedTab} />
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                            <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                                <SearchBar />
                                <Button
                                    variant="filter"
                                    size="filter"
                                    className='border border-zinc-300 flex items-center rounded'>
                                    <FilterIcons
                                        className=""
                                        fill="#CC0019" />
                                </Button>
                                <DatePickerWithRange />
                            </div>
                        </div>

                        <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                            <VerificationTable data={filterData} isOpen={open} setOpen={setOpen} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
