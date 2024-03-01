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
import { BinTableList } from './components/BinTable/BinTableList'
import { CreateNewBinDialog } from './components/dialog/CreateNewBinDialog'

export default function BinManagementPage() {

    const [creteNewDialog, setCreateNewDialog] = useState(false)
    const [selectedBinID, setSelectedBinID] = useState("")
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
    const filteredData = data.filter((item) => item.id === selectedBinID);
    let itemsData = [];

    if (filteredData.length > 0) {
        itemsData = filteredData[0].items;
    }



    console.log("selectedID : ", selectedBinID);

    return (

        <>
            <CreateNewBinDialog open={creteNewDialog} setOpen={setCreateNewDialog} setReloadData={setIsReloadData} />
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
                                <p className=" text-blue-900 text-sm font-light ">Bin Manager | {binTotal > 0 ? (binTotal) : ""} Bin </p>
                            </div>
                        </div>
                        <div className={`${styles.menus} flex flex-row`}>
                            <div className="">
                                <button
                                    className={`${isBinSelect ? "border-b border-blue-900 font-bold text-myBlue" : "text-sm  text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                                    onClick={() => setIsBinSelect(true)}
                                >
                                    Bin
                                </button>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => setIsBinSelect(false)}
                                    className={`${isBinSelect ? "text-zinc-800 font-light" : "border-b border-blue-900 font-bold  text-myBlue"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                                >
                                    Unassigned
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 py-2">
                        <BinTableList
                            handleSelect=
                            {handleBinSelection}
                            setCreateNewDialog={setCreateNewDialog}
                            isSelected={selectedBinID}
                            isReloadData={isReloadData}
                            setBinTotal={setBinTotal}
                            isBinSelect={isBinSelect}
                        />
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.packageItems}>
                        <div className={styles.packageHeader}>
                            <div className={styles.packageBanner}>
                                <div className={`${styles.title} flex flex-col`}>
                                    <h1 className=" text-zinc-900 text-sm font-bold ">Package Items</h1>
                                    <p className=" text-blue-900 text-sm font-light ">{selectedBinID ? selectedBinID : "Unassigned"} | {pakcageTotal} Items  </p>
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
                            <ItemTable
                                setPackageTotal={setPackageTotal}
                                selectedBinID={selectedBinID}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
