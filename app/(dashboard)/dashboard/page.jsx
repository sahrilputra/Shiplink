'use client'
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss';
import { PromoOne } from '@/components/ads/promoOne';
import { SearchIcon } from '@/components/icons/iconCollection';
import { ForwadPakage } from './components/dashboardMenus/ForwadPakage';
import { Button } from '@/components/ui/button';
import { ModalContext } from '@/context/ModalContext';
import { SkeletonItems } from './components/Skeleton/SkeletonItems';
import axios from 'axios';
import { ItemsPackage } from './components/items/itemsPackage';

export default function Dashboard() {

    const { isOpen, openModal, closeModal } = useContext(ModalContext);
    const [selectedTab, setSelectedTab] = useState("all");
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        lots_id: "",
        bins_id: "",

        status: "",
        page: 1,
        limit: 10,
        index: 0,
    })


    const [isFetchingPaused, setIsFetchingPaused] = useState(false);



    const fetchData = async () => {
        try {
            const response = await axios.post(`/api/admin/packages/list`, query)
            setData(response.data.package_info)
            setTotal(response.data.total)
            setIsSkeleton(false)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    useEffect(() => {
        let timer;
        if (!isFetchingPaused) {
            timer = setTimeout(() => {
                fetchData();
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [isFetchingPaused, query]);

    useEffect(() => {
        if (total >= data.length) {
            setQuery((prevQuery) => ({
                ...prevQuery,
                limit: total,
            }))
        } else {
            null
        }
    }, [total, data.length])


    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    }
    const [expandedItemId, setExpandedItemId] = useState(null);

    const handleSearchChange = (event) => {
        setQuery({
            keyword: event.target.value
        });
    };


    const reloadData = () => {
        // fetchData()
        setQuery((prevQuery) => ({
            ...prevQuery,
            keyword: ""
        }));
        console.log("RELOAD DATA")
        setExpandedItemId(null)
        closeExpand()
    }
    const toggleExpand = (itemId) => {
        if (expandedItemId === itemId) {
            setExpandedItemId(null);
            setIsFetchingPaused(false)
        } else {
            setIsFetchingPaused(true)
            setExpandedItemId(itemId);
        }
    };
    const closeExpand = () => {
        setIsFetchingPaused(false)
        setExpandedItemId(null)
    }
    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    }

    const dataLength = data?.length;
    // const filterData = selectedTab === 'all' ? data : data.filter(item => item.package.orderType === selectedTab);


    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.tabs}>
                        <div className="w-[311px] h-[46px] p-[5px] justify-start items-start gap-[19px] inline-flex">
                            <div className="flex-col justify-start items-center gap-1.5 inline-flex">
                                <div
                                    onClick={() => handleTabClick("all")}
                                    className="justify-start items-start gap-[5px] inline-flex cursor-pointer"
                                >
                                    <div className="text-zinc-900 text-base font-semibold ">All</div>
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">{total || 0}</div>
                                </div>
                                <div className={`${selectedTab === 'all' ? ('w-[44.25px] h-1.5 relative') : ('hidden')}`}>
                                    <div className="w-[35.48px] h-1.5 left-0 top-0 absolute bg-red-700 rounded-sm" />
                                    <div className="w-[5.38px] h-1.5 left-[38.87px] top-0 absolute bg-red-700 rounded-sm" />
                                </div>
                            </div>
                            <div className="flex-col justify-start items-center gap-1.5 inline-flex">
                                <div
                                    className="justify-start items-start gap-[5px] inline-flex cursor-pointer"
                                    onClick={() => handleTabClick("incoming")}
                                >
                                    <div className="text-zinc-900 text-base font-semibold ">Incoming</div>
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">{total || 0}</div>
                                </div>
                                <div className={`${selectedTab === 'incoming' ? ('w-[44.25px] h-1.5 relative') : ('hidden')}`}>
                                    <div className="w-[35.48px] h-1.5 left-0 top-0 absolute bg-red-700 rounded-sm" />
                                    <div className="w-[5.38px] h-1.5 left-[38.87px] top-0 absolute bg-red-700 rounded-sm" />
                                </div>
                            </div>
                            <div className="flex-col justify-start items-center gap-1.5 inline-flex">
                                <div
                                    className="justify-start items-start gap-[5px] inline-flex cursor-pointer"
                                    onClick={() => handleTabClick("outgoing")}
                                >
                                    <div className="text-zinc-900 text-base font-semibold ">Outgoing</div>
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">0</div>
                                </div>
                                <div className={`${selectedTab === 'outgoing' ? ('w-[44.25px] h-1.5 relative') : ('hidden')}`}>
                                    <div className="w-[35.48px] h-1.5 left-0 top-0 absolute bg-red-700 rounded-sm" />
                                    <div className="w-[5.38px] h-1.5 left-[38.87px] top-0 absolute bg-red-700 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.rightContent} mx-5 relative  right-[20.87px]`}>
                        <div className="w-[373px] h-10 justify-between items-start inline-flex gap-3">
                            <div type='text' className="w-full h-10 px-[15px] py-2.5 bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                                <input
                                    onChange={handleSearchChange}
                                    type="text"
                                    className='w-[90%] text-zinc-500 text-xs font-normal focus:outline-none border-none'
                                    placeholder='Search ...'

                                />
                                <SearchIcon className="w-4 h-4" />
                            </div>
                            <Button
                                variant="secondary"
                                className="h-10 px-10 text-xs"
                                disabled={true}
                            >
                                <p>Consolidate</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.item_container}>
                    <div className={styles.items}>
                        {
                            isSkeleton
                                ? (
                                    <div className="flex flex-col gap-2">
                                        <SkeletonItems />
                                        <SkeletonItems />
                                        <SkeletonItems />
                                    </div>
                                )
                                : (
                                    data?.map((item, i) => (
                                        <ItemsPackage
                                            pauseFetch={setIsFetchingPaused}
                                            key={item.tracking_id}
                                            onClickButton={handleButtonClick}
                                            item={item}
                                            onExpand={toggleExpand}
                                            isExpand={expandedItemId === item.tracking_id}
                                            reload={reloadData}
                                        />
                                    ))
                                )
                        }
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.rightPanelHeader}>
                    {selectedButton === "Cross Border Forward" ? (
                        <ForwadPakage />
                    ) : selectedButton === "Forward Package" ? (
                        <>
                            <ForwadPakage />
                        </>
                    ) : (
                        <div className="ads">
                            <PromoOne />
                        </div>
                    )}
                </div >
            </div >
        </>
    )
}
