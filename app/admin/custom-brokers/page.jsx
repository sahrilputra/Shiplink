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
        status_id: "",
        page: 1,
        limit: 10,
        index: 0,
    });
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowTotalData, setRowTotalData] = useState({
        page_limit: 0,
        page_total: 0,
        total: 0
    })

    const [totalDataLenght, setTotalDataLength] = useState(0)
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/verification/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            const filterData = selectedTab !== 'Cleared Custom'
                ? data.package_info.filter(item => item.status !== 'Clearance Received')
                : data.package_info.filter(item => item.status === 'Clearance Received');
            setData(filterData);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit,
            }));
            setTotalDataLength(data.total);
            // setclearancePendingCount(data.package_info.filter(item => item.status !== 'Cleared Custom').length);
            // setclearanceCustomsCount(data.package_info.filter(item => item.status === 'Cleared Custom').length);
            setIsSkeleton(false);
        } catch (error) {
            setIsSkeleton(false);
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [query]);

    useEffect(() => {
        const fetchCountingTotal = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/verification/list`,
                    {
                        keyword: "",
                        date_start: "",
                        date_end: "",
                        tracking_id: "",
                        status: "",
                        page: 1,
                        limit: totalDataLenght,
                        index: 0,
                    }
                );
                console.log(response)
                const data = await response.data;
                setclearancePendingCount(data.package_info.filter(item => item.status !== 'Cleared Custom').length);
                setclearanceCustomsCount(data.package_info.filter(item => item.status === 'Cleared Custom').length);
                console.log("Package Length : ", data.package_info)
                setIsSkeleton(false);
            } catch (error) {
                setIsSkeleton(false);
                console.log('Error:', error);
            }
        }

        fetchCountingTotal()
    }, [totalDataLenght])

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

    const handlerSelectedTab = async (tab) => {
        console.log("🚀 ~ handlerSelectedTab ~ tab:", tab)
        setSelectedTab(tab);
        setIsSkeleton(true);
        if (tab === 'Pending') {
            setQuery({
                status: "",
                status_id: "7",
                page: 1,
                limit: 10,
                index: 0,
            })
            setIsSkeleton(false);
        } else if (tab === 'Cleared Custom') {
            setQuery({
                page: 1,
                limit: 10,
                index: 0,
                status: "",
                status_id: "9",
            })
            setRowTotalData({
                page_limit: 0,
                page_total: 0,
                total: 0
            });
            setPagination({
                pageIndex: 0,
                pageSize: 10,
            });
        } else if (tab === 'All') {
            setQuery({
                page: 1,
                limit: 10,
                index: 0,
                status: "",
            })
            setRowTotalData({
                page_limit: 0,
                page_total: 0,
                total: 0
            });
            setPagination({
                pageIndex: 0,
                pageSize: 10,
            });
        }
        else {
            setQuery({
                page: 1,
                limit: 10,
                index: 0,
                status: ""
            })
            setRowTotalData({
                page_limit: 0,
                page_total: 0,
                total: 0
            });
            setPagination({
                pageIndex: 0,
                pageSize: 10,
            });
        }
        console.log("🚀 ~ handlerSelectedTab ~ query:", query)
    }
    const [clearancePendingCount, setclearancePendingCount] = useState(0);
    const [clearanceCustomsCount, setclearanceCustomsCount] = useState(0);
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
                        <CustomMenus selectedTab={setSelectedTab} isSelected={selectedTab} handlerSelectedTab={handlerSelectedTab} />
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={`${styles.listTable} flex flex-col gap-1`}>
                            <PendingTable
                                data={data}
                                isSkeleton={isSkeleton}
                                handleSearchChange={handleSearchChange}
                                reload={reload}
                                setQuery={setQuery}
                                query={query}
                                pagination={pagination}
                                setPagination={setPagination}
                                rowTotalData={rowTotalData}
                                totalPage={rowTotalData.page_total}
                                setRowTotalData={setRowTotalData}
                                pageIndex={pagination.pageIndex}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
