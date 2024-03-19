'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { WarehouseDataList } from './components/table/WarehouseDataTable'
import data from '../../../data/admin/WarehouseDataList.json'
import { Loaders } from '@/components/ui/loaders'
export default function WarehousePage() {

    const [wrTotal, setWrTotal] = useState(null);
    // const [open, setOpen] = useState(false);

    // const [selectedTab, setSelectedTab] = useState("Pending");
    // console.log("parent : ", selectedTab)

    // const filterData = selectedTab === 'Pending' ? data.filter(item => item.Status === 'Pending') : data.filter(item => item.Status === selectedTab);
    // const clearancePendingCount = data.filter(item => item.CustomsStatus === 'Complete').length;
    // const clearanceCustomsCount = data.filter(item => item.CustomsStatus === 'Cleared Custom').length;

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/warehouse-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Warehouse Management</h1>
                            <p className=" text-blue-900 text-xs font-normal">{wrTotal} Warehouse</p>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={`${styles.listTable} flex flex-col gap-1`}>
                            <WarehouseDataList setWrTotal={setWrTotal} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
