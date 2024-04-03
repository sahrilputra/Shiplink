'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
// import data from '../../../data/admin/TransportSingleItemData.json'
import { SingleItemsTable } from './components/TransportTabled/SingleItemTable'
import { AssingLotsDialog } from './components/AssignLotsDialog/AssignToLotsDialog'
import { CreateNewLotsDialog } from './components/AssignLotsDialog/CreateNewLotsDialog'
export default function TransportPage({ props }) {
    const [open, setOpen] = useState(false);
    const [openNewDialog, setOpenNewDialog] = useState(false);
    console.log("props", props)

    // const [query, setQuery] = useState({

    // })

    // useEffect(() => { 
    //    const fetchData = async () => { 
    //     const response = await axios.post(

    //     )
    //    }
    // })
    // props.setContent("Showing All Lots")
    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                </div>

                <div className={`${styles.listTable} flex flex-col gap-1`}>
                    <SingleItemsTable  setOpen={setOpen} isOpen={open} setOpenNewDialog={setOpenNewDialog} />
                </div>
                <CreateNewLotsDialog open={openNewDialog} setOpen={setOpenNewDialog} />
            </div>
        </>
    )
}
