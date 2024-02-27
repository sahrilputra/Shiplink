'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { DestinationTabled } from './components/DestinationTabled/DestinationScan'
import data from '../../../data/admin/DestinationScanData.json'
import { DestinationLotsDetails } from './components/DestinationLotsDetails'
import Image from 'next/image'
export default function PARSPage() {

    const [totalData, setTotalData] = useState(null)
    const [clickedID, setDataID] = useState(null)
    const [clickedData, setClickedData] = useState("");
    const [key, setKey] = useState(0);
    const [rowData, setRowData] = useState(null)
    const handleDataID = (id) => {
        const filterData = data.find((item) => item.LotsID === id)
        setClickedData(filterData);
        setDataID(id);
        setKey((prevKey) => prevKey + 1);
    }

    console.log(clickedID)
    console.log(clickedData)


    const [clicked, isClicked] = useState(false);
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }
    const [tabledData, setTabledData] = useState([]);
    console.log(tabledData)

    const getTableData = (data) => {
        setTabledData(data);
    }


    const handleSelectedRowData = (data) => {
        console.log("Row Data :", data)
        setRowData(data)
        setClickedData(data.lots_id)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/destination-blue.png"}
                                width={40}
                                height={40}
                                alt='Destination icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Destination Scan</h1>
                            <p className=" text-blue-900 text-sm font-light ">{totalData ? totalData : "0"} Lots</p>
                        </div>
                    </div>

                    <div className={`${styles.menus}`}>
                        
                    </div>
                </div>

                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={styles.leftTabled}>
                            <DestinationTabled handleSelectedRowData={handleSelectedRowData} isSelected={clickedData} setTotalData={setTotalData} />
                        </div>

                        <div className={styles.details}>
                            <DestinationLotsDetails data={rowData} key={key} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
