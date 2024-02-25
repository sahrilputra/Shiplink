'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { PendingTable } from './components/CustomTable/PendingTable'
import data from '../../../data/admin/CustomBrokerData.json'
import Image from 'next/image'
import { CustomMenus } from './components/ConfigMenus'
import axios from 'axios'
export default function CustomBrokerPage() {

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 0,
        limit: 0,
        index: 0
    });
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/verification/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setData(data.package_info);
            console.log("Package Length : ", data.package_info.length)
            setIsSkeleton(false);
        } catch (error) {
            setIsSkeleton(false);
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [query]);

    const reload = () => {
        setIsSkeleton(true);
        fetchData();
    }

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };

    const [selectedTab, setSelectedTab] = useState("");
    console.log("parent : ", selectedTab)

    const filterData = selectedTab !== 'Cleared Custom'
        ? data.filter(item => item.status !== 'Cleared Custom')
        : data.filter(item => item.status === 'Cleared Custom');
    const clearancePendingCount = data.filter(item => item.status !== 'Cleared Custom').length;
    const clearanceCustomsCount = data.filter(item => item.status === 'Cleared Custom').length;

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/broker-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Customs Broker</h1>
                            <p className=" text-blue-900 text-xs font-normal">Pending : {clearancePendingCount} | Clearance : {clearanceCustomsCount}</p>
                        </div>
                    </div>
                    <div className={`${styles.menus}`}>
                        <CustomMenus selectedTab={setSelectedTab} isSelected={selectedTab} />
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={`${styles.listTable} flex flex-col gap-1`}>
                            <PendingTable data={filterData}
                                isSkeleton={isSkeleton}
                                handleSearchChange={handleSearchChange}
                                reload={reload}
                                setQuery={setQuery}
                                query={query}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
