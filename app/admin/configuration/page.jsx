'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { CarrierList } from './components/CarrierList'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import axios from 'axios'
export default function Configuration() {

    const [carrierList, setCarrierList] = useState([])
    const fetchData = async () => {
        const response = await axios.post('/api/admin/config/courrier/list', {
            keyword: "",
            page: 1,
            limit: 10,
            index: 0,
        })
        console.log("Reponse ", response)
        setCarrierList(response.data.carrier)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log("Carrier List", carrierList)
    return (
        <>
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
                    </div>
                    <Button className="px-4"
                        variant="destructive"
                        size="sm">
                        <div className="text-xs font-normal ">Connect New Carrier</div>
                    </Button>
                </div>

                <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                    {
                        carrierList.map((carrier, index) => {
                            return <CarrierList key={index} data={carrier} />
                        })
                    }
                </div>

            </div>
        </>
    )
}
