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
import { set } from 'date-fns';

export default function Dashboard() {

    const { isOpen, openModal, closeModal } = useContext(ModalContext);
    const [selectedTab, setSelectedTab] = useState("all");
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [data, setData] = useState([])
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 0,
        limit: 0,
        index: 0,
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/api/admin/packages/list`, query)
                setData(response.data.data)
                setIsSkeleton(false)
            } catch (error) {
                console.log("🚀 ~ error", error)
            }
        }
        fetchData()
    }, [query])

    const reloadData = (prevQuery) => {
        setIsSkeleton(true)
        setQuery({ ...prevQuery, page: 0, limit: 0, index: 0 })
    }

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    }
    const [expandedItemId, setExpandedItemId] = useState(null);

    const toggleExpand = (itemId) => {
        if (expandedItemId === itemId) {
            setExpandedItemId(null);
        } else {
            setExpandedItemId(itemId);
        }
    };
    const closeExpand = () => {
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
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">{dataLength || 0}</div>
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
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">{dataLength || 0}</div>
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
                                <input type="text" className='w-[90%] text-zinc-500 text-xs font-normal focus:outline-none border-none' placeholder='Search ...' />
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
                                    data.map((item, i) => (
                                        <ItemsPackage
                                            key={i}
                                            onClickButton={handleButtonClick}
                                            item={item}
                                            onExpand={toggleExpand}
                                            isExpand={expandedItemId === item.tracking_id}
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
