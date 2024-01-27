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
export default function PARSPage() {

    const [clickedID, setDataID] = useState(null)
    const [clickedData, setClickedData] = useState(null);
    const [key, setKey] = useState(0);
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

    return (
        <>
            <div className={styles.carrier}>
                <div className={styles.leftTabled}>
                    <DestinationTabled data={data} handleData={handleDataID} />
                </div>

                <div className={styles.details}>
                    <DestinationLotsDetails data={clickedData} key={key}/>
                </div>
            </div>
        </>
    )
}
