'use client'
import React, { useState, useContext } from 'react'
import styles from './styles.module.scss';
import { PromoOne } from '@/components/ads/promoOne';
import { SearchIcon } from '@/components/icons/iconCollection';
import { ForwadPakage } from '../dashboard/components/dashboardMenus/ForwadPakage';
import { Button } from '@/components/ui/button';
import ItemsPackage from '../dashboard/components/items/itemsPackage';
import { PaymentModals } from '../dashboard/components/dashboardMenus/payments/paymentModals';
import { ModalContext } from '@/context/ModalContext';
import data from '../../../data/dashboardData.json'

export default function ShippingLebel() {

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
    const { isOpen, openModal, closeModal } = useContext(ModalContext);

    const [selectedTab, setSelectedTab] = useState("outgoing");
    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    }


    console.log("isOpen", isOpen);
    console.log("openModal", openModal);
    console.log("closeModal", closeModal);


    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        console.log(selectedButton)
    }
    const filterData = data.filter(item => item.package.orderType === selectedTab);
    return (
        <>

            <PaymentModals isOpen={isOpen} isClose={closeModal} />
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
                                    onExpand={toggleExpand}
                                    isExpand={expandedItemId === item.package.id}
                                />
                            ))
                        }
                        {/* <ItemsPackage />
                        <ItemsPackage /> */}
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
                {selectedButton === "Cross Border Forward" ? (
                    <ForwadPakage />
                ) : (
                    <div className="ads">
                        <PromoOne />
                    </div>
                )}


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
