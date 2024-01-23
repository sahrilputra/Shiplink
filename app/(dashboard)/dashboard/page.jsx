'use client'
import React, { useState, useContext } from 'react'
import styles from './styles.module.scss';
import { PromoOne } from '@/components/ads/promoOne';
import { SearchIcon } from '@/components/icons/iconCollection';
import { ForwadPakage } from './components/dashboardMenus/ForwadPakage';
import { Button } from '@/components/ui/button';
import ItemsPackage from './components/items/itemsPackage';
import { PaymentModals } from './components/dashboardMenus/payments/paymentModals';
import { ModalContext } from '@/context/ModalContext';
import data from '../../../data/dashboardData.json'
import { DetailsModals } from './components/DialogDetails/Details';
export default function Dashboard() {


    const { isOpen, openModal, closeModal } = useContext(ModalContext);
    const [selectedTab, setSelectedTab] = useState("all");
    const [expandedItemIndex, setExpandedItemIndex] = useState(null);
    console.log("expand index ", expandedItemIndex)


    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
        setExpandedItemIndex(null)
    }

    const handleItemExpand = (itemId) => {
        setExpandedItemIndex((prevId) => (prevId === itemId ? null : itemId));
    }

    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        setExpandedItemIndex(null)
        console.log(selectedButton)
    }

    const filterData = selectedTab === 'all' ? data : data.filter(item => item.package.orderType === selectedTab);
    console.log("data", filterData.map(item => item.orderType))
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
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">0</div>
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
                                    <div className="p-1 bg-red-700 rounded text-white text-xs font-semibold">0</div>
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
                            >
                                <p>Consolidate</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.item_container}>
                    <div className={styles.items}>
                        {
                            filterData.map((item, i) => (
                                <ItemsPackage
                                    key={i}
                                    onClickButton={handleButtonClick}
                                    item={item}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
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
        </>
    )
}
