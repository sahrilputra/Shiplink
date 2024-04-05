'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { HistoryIcon, Plus } from 'lucide-react'
import Image from 'next/image'
import { HistoryTableList } from '../components/ItemTable/HistoryTable'
export default function BinManagementPage() {

    const [creteNewDialog, setCreateNewDialog] = useState(false)
    const [selectedBinID, setSelectedBinID] = useState("Undefined")
    const [isReloadData, setIsReloadData] = useState(false)
    const [binTotal, setBinTotal] = useState(0)
    const [isBinSelect, setIsBinSelect] = useState(false);
    const [pakcageTotal, setPackageTotal] = useState(0);
    const handleBinSelection = (id) => {
        setSelectedBinID(id)
    }

    const handleTabClick = (tabName) => {
        setSelectedTabs(tabName);
    }


    console.log("selectedID : ", selectedBinID);

    return (

        <>

            <div className={`${styles.container} `}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/bin-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='Bin Management icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Bin History</h1>
                            </div>
                        </div>
                    </div>
                    <div className={styles.childContent}>
                        <div className={styles.carrier}>
                            <div className={`${styles.listTable} flex flex-col gap-1`}>
                                <HistoryTableList />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}
