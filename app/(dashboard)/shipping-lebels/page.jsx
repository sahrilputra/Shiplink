'use client'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { PromoOne } from '@/components/ads/promoOne';
import { SearchIcon } from '@/components/icons/iconCollection';
import { ForwadPakage } from '../dashboard/components/dashboardMenus/ForwadPakage';
import { Button } from '@/components/ui/button';

import NextLink from 'next/link'
import axios from 'axios'
export default function ShippingLebel() {

    const [selectedTab, setSelectedTab] = useState("all");

    const [expandedItemId, setExpandedItemId] = useState(null);

    const toggleExpand = (itemId) => {
        if (expandedItemId === itemId) {
            // If the clicked item is already expanded, close it
            setExpandedItemId(null);
        } else {
            // If another item is expanded, close it and expand the clicked item
            setExpandedItemId(itemId);
        }
    };

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    }



    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        console.log(selectedButton)
    }
    // const filterData = data.filter(item => item.package.orderType === selectedTab);
    return (
        <>

            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.tabs}>
                        <div className="w-[311px] h-[46px] p-[5px] justify-start items-start gap-[19px] inline-flex">
                            <h2 className=' text-lg font-bold'>Outgoing Shipment</h2>

                        </div>
                    </div>

                    <div className={`${styles.rightContent} mx-5 relative  right-[20.87px]`}>
                        <div className="w-[373px] h-10 justify-between items-start inline-flex gap-3">
                            <div type='text' className="w-full h-10 px-[15px] py-2.5 bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                                <input type="text" className='w-[90%] text-zinc-500 text-xs font-normal focus:outline-none border-none' placeholder='Search ...' />
                                <SearchIcon className="w-4 h-4" />
                            </div>
                            <NextLink href={"/shipping-lebels/new-labels"} >
                                <Button
                                    variant="destructive"
                                    size="xs"
                                    className="h-10 px-5 text-xs"
                                >
                                    <p>New Shipping label</p>
                                </Button>
                            </NextLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.rightPanelHeader}>
                    {selectedButton === "Cross Border Forward" ? (
                        <ForwadPakage />
                    ) : (
                        <div className="ads">
                            <PromoOne />
                        </div>
                    )}


                </div>
            </div>


            {/* <div className={styles.item_container}>

                <div className={styles.items}>
                    <ItemsPackage />
                    <ItemsPackage />
                    <ItemsPackage />
                </div>
            </div> */}

        </>
    )
}
