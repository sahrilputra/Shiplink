'use client'
import React, { useState } from 'react'
import { PromoOne } from '@/components/ads/promoOne'
import { FilterIcons, SearchIcon } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import styles from './styles.module.scss'
import { SavedBoxCard } from './components/card'
import { DeleteIcons, IconList, GridIcons } from '@/components/icons/iconCollection'
// import { PlusIcons } from '@/components/icons/iconCollection'
import { PlusIcon } from 'lucide-react'
import { SearchBar } from '@/components/ui/searchBar'
import { SavedBoxFrame } from './components/SavedBoxFrame'
import data from '../../../data/SavedSizeBoxData.json'


export default function SavedBox() {
    const [newAddress, setIsNew] = useState(false);
    const [editAddress, setIsEdit] = useState(false);
    const [clicked, isClicked] = useState(true);
    const [selectedData, setSelectedData] = useState(null);
    const [keyForEditAddressMenu, setKeyForEditAddressMenu] = useState(0); // State untuk key unik

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }

    const toggleSelectNewAddress = () => {
        setIsNew(true);
        setIsEdit(false);
    }

    const toggleEditedAddress = () => {
        setIsEdit(true);
        setIsNew(false);
        setKeyForEditAddressMenu(prevKey => prevKey + 1); // Update key unik
    }

    const toggleClose = () => {
        setIsEdit(false);
        setIsNew(false);
    }


    const handleCardSelected = (id) => {
        const selectedAddress = data.find(item => item.id === id);
        setSelectedData(selectedAddress);
    }


    const renderMenus = () => {
        switch (true) {
            case newAddress:
                return <SavedBoxFrame close={toggleClose} />;
            case editAddress:
                return <SavedBoxFrame keyProp={keyForEditAddressMenu} close={toggleClose} data={selectedData} />;
            default:
                return <PromoOne />;
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>

                    <div className="wrap flex justify-between items-center w-full px-[20px]">
                        <div className="left flex flex-row justify-center items-center gap-5">
                            <div className="p-1 rounded-md border border-neutral-200 justify-start items-start gap-2.5 inline-flex">
                                <button
                                    id='savedAddress'
                                    className={`font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none text-black' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                                    onClick={() => toggleClicked(false)}
                                >
                                    <GridIcons width={15} height={15} className={`${clicked ? ' text-black' : ' fill-white font-semiBold hover:bg-red-800'}`} />
                                </button>
                                <button
                                    id='newAddress'
                                    className={`font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-red-700 text-white font-semiBold hover:bg-red-800' : 'bg-none'}`}
                                    onClick={() => toggleClicked(true)}
                                >
                                    <IconList width={15} height={15} className={`${clicked ? ' fill-white font-semiBold hover:bg-red-800' : 'bg-none'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="left flex flex-row justify-center items-center gap-5">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <FilterIcons fill="#CC0019" />
                            </Button>
                        </div>

                        <div className="left flex flex-row justify-center items-center gap-5">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="px-2 py-2"
                            >
                                <DeleteIcons width={20} height={20} fill="#ffff" />
                            </Button>
                            <Button
                                variant="destructive"
                                className="h-10 px-10 text-xs flex flex-row justify-around items-center gap-2"
                                onClick={toggleSelectNewAddress}
                            >
                                <PlusIcon width={15} height={15} fontWeight={20} fill="#ffff" />
                                <p className='text-sm font-semibold'>Add New</p>
                            </Button>
                        </div>
                    </div>

                </div>
                <div className={styles.item_container}>
                    <div className={styles.items}>
                        {
                            data.map((item, i) => (
                                <>
                                    <SavedBoxCard
                                        variant={clicked ? 'list' : 'grid'}
                                        data={item}
                                        key={i}
                                        selected={toggleEditedAddress} 
                                        onClick={handleCardSelected}
                                        />

                                </>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
                {
                    renderMenus()
                }
            </div>
        </>
    )
}
