'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { VerificationTable } from './components/Table/VerificationTable'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import { addDays, format } from "date-fns";
import Image from 'next/image'
import { VerificationMenus } from './components/menus/VerificationMenus'
import axios from 'axios'
import { DataTable } from './components/Table/DataTable'
import { Skeleton } from '@/components/ui/skeleton'

export default function VerificationPages() {
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };



    console.log("🚀 ~ VerificationPages ~ selectDate:", date)
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
            setIsSkeleton(false);
        } catch (error) {
            setIsSkeleton(false);
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleSetDate = (newDate) => {
        setDate({
            from: formatDate(newDate?.from || new Date()),
            to: formatDate(newDate?.to || new Date()),
        });

        setQuery({
            ...query,
            date_start: date.from,
            date_end: date.to,
        });
    };
    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };
    const [selectedTab, setSelectedTab] = useState("All");
    console.log("parent : ", selectedTab)

    // const filterData = selectedTab === 'All' ? data : data.filter(item => item.CustomsStatus === selectedTab);
    const handlerSelectedTab = (tab) => {
        setSelectedTab(tab);
        setIsSkeleton(true);
        if (tab === 'All') {
            setQuery({
                ...query,
                status: ""
            })
            setIsSkeleton(false);
        } else if (tab === 'Unverified') {
            setQuery({
                ...query,
                status: "Declared"
            })
            setIsSkeleton(false);
        } else {
            setQuery({
                ...query,
                status: tab
            })
            setIsSkeleton(false);
        }
    }

    const reloadData = () => {
        setIsSkeleton(true); // Set skeleton loading state
        fetchData(); // Refetch data using the useEffect hook
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/verification-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Verification</h1>
                            <p className=" text-blue-900 text-xs font-normal">Showing Verification Items</p>
                        </div>
                    </div>
                    <div className={`${styles.menus}`}>
                        <VerificationMenus selectedTab={setSelectedTab} isSelected={selectedTab} handlerTab={handlerSelectedTab} />
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                            <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                                <SearchBar handleSearch={handleSearchChange} />
                                <DatePickerWithRange
                                    mySetdate={handleSetDate}
                                />
                            </div>
                        </div>

                        <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                            {/* <DataTable data={data} isSkeleton={isSkeleton} handleSearchChange={handleSearchChange} /> */}
                            <VerificationTable data={data} isOpen={open} setOpen={setOpen} isSkeleton={isSkeleton} reloadData={reloadData} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
