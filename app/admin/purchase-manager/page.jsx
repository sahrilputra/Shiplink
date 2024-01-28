'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import data from '../../../data/admin/assistedPurchaseData.json'
import { AssitedMenus } from './components/menus/ConfigMenus'
import { PendingTable } from './components/table/assitedTable'
export default function CustomBrokerPage() {

    // const [open, setOpen] = useState(false);

    // const [selectedTab, setSelectedTab] = useState("Clearance Pending");
    // console.log("parent : ", selectedTab)

    // const filterData = selectedTab === 'Clearance Pending' ? data.filter(item => item.CustomsStatus === 'Clearance Pending') : data.filter(item => item.CustomsStatus === selectedTab);
    // const clearancePendingCount = data.filter(item => item.CustomsStatus === 'Clearance Pending').length;
    // const clearanceCustomsCount = data.filter(item => item.CustomsStatus === 'Cleared Custom').length;

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/assisted-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Assisted Purchase</h1>
                            <p className=" text-blue-900 text-xs font-normal">Showing 10 Items</p>
                        </div>
                    </div>
                    <div className={`${styles.menus}`}>
                        <AssitedMenus />
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={`${styles.listTable} flex flex-col gap-1`}>
                            <PendingTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
