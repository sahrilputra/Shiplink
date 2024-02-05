'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { HistoryIcon, Plus } from 'lucide-react'
import { ItemTable } from './components/ItemTable/ItemsTable'
import data from '../../../data/admin/BinManagerData.json'
import Image from 'next/image'
import { BinMenus } from './components/menus/BinMenus'
import { BinTableList } from './components/BinTable/BinTableList'
import { CreateNewBinDialog } from './components/dialog/CreateNewBinDialog'

export default function BinManagementPage() {

    const [creteNewDialog, setCreateNewDialog] = useState(false)
    const [selectedBinID, setSelectedBinID] = useState(null)
    console.log('selected', selectedBinID)

    const handleBinSelection = (id) => {
        setSelectedBinID(id)
    }

    const filteredData = data.filter((item) => item.id === selectedBinID);
    let itemsData = [];

    if (filteredData.length > 0) {
        itemsData = filteredData[0].items;
    }



    console.log(itemsData);

    return (

        <>
            <div className={styles.wrapper}>
                <div className={styles.binItems}>
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
                                <h1 className=" text-zinc-900 text-sm font-bold ">Bin Manager</h1>
                                <p className=" text-blue-900 text-sm font-light ">Bin Manager | 124 Bin | 1100 Items </p>
                            </div>
                        </div>
                        <div className={`${styles.menus}`}>
                            <BinMenus />
                        </div>
                    </div>
                    {/* <div className="px-2 py-2 border-b border-[#dedede]">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <FilterIcons fill="#CC0019" />
                            </Button>
                            <Button
                                onClick={() => setCreateNewDialog(true)}
                                variant="filter"
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <Plus fill="#CC0019" />
                            </Button>
                        </div>
                    </div> */}
                    <div className="px-2 py-2">
                        <BinTableList handleSelect={handleBinSelection} setCreateNewDialog={setCreateNewDialog} data={data} isSelected={selectedBinID} />
                    </div>
                </div>
                <div className={styles.childContent}>
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
                            <ItemTable data={itemsData} />
                        </div>
                    </div>
                </div>
            </div>
            <CreateNewBinDialog open={creteNewDialog} setOpen={setCreateNewDialog} />
        </>

    )
}
