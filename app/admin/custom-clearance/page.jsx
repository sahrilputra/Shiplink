'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import data from '../../../data/admin/ClearanceData.json'
import { CustomClearanceTable } from './components/Table/CustomClearanceTable'
import Image from 'next/image'
import { CustomBrokerDropdownMenus } from './components/Menus/DropdownMenus'
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
                                src={"/backoffice/clearance-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Custom Clearance </h1>
                            <p className=" text-blue-900 text-xs font-normal">Custom Status</p>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
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
                                <DatePickerWithRange />
                            </div>
                        </div>

                        <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                            <CustomClearanceTable data={data} isOpen={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            </div>
         
        </>
    )
}
