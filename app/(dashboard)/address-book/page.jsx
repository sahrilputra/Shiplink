'use client'
import React, { useState } from 'react'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { GridIcons, FilterIcons, IconList, DeleteIcons } from '@/components/icons/iconCollection'
import { PlusIcon } from 'lucide-react'
import { PromoOne } from '@/components/ads/promoOne'
import styles from './styles.module.scss'
import { SavedAddressCard } from './components/SavedAddressCard'
import data from '../../../data/countryData.json'
import { NewAdressMenus } from './components/NewAdressMenus'
import { useToast } from '@/components/ui/use-toast'
import { EditAddressMenu } from './components/EditedAddressMenu'
export default function AssitedPurchase() {

    const { toast } = useToast();

    const [newAddress, setIsNew] = useState(false);
    const [editAddress, setIsEdit] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [keyForEditAddressMenu, setKeyForEditAddressMenu] = useState(0); // State untuk key unik
    const [isCheck, setIsCheck] = useState(false);
    const [isPicked, setIsPicked] = useState(false);

    const [selectedItemId, setSelectedItemId] = useState(null); // State untuk ID item yang dipilih
    const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false);
    console.log("selectedItemId", selectedItemId)
    // List grid view

    const [clicked, isClicked] = useState(true);

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }

    // end list grid view

    const toggleCheck = () => {
        setIsCheck(!isCheck);

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
        setIsPicked(false)
    }


    const handleCardSelected = (id) => {
        const selectedAddress = data.find(item => item.id === id);
        setSelectedData(selectedAddress);
        setIsPicked(true)
        if (selectedItemId === id) {
            setSelectedItemId(null);
            setIsDeleteButtonActive(false);
        } else {
            setSelectedItemId(id);
            setIsDeleteButtonActive(true);
        }
    }


    const renderMenus = () => {
        switch (true) {
            case newAddress:
                return <NewAdressMenus close={toggleClose} />;
            case editAddress:
                return <EditAddressMenu keyProp={keyForEditAddressMenu} close={toggleClose} data={selectedData} />;
            default:
                return <PromoOne />;
        }
    }

    return (
        <>
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
                                    variant={isDeleteButtonActive ? "destructive" : "disable"}
                                    size="icon"
                                    onClick={() => toast({ title: 'Address Removed', description: 'Success Remove Address', type: 'success' })}
                                    className={`px-2 py-2 cursor-not-allowed ${isDeleteButtonActive ? 'cursor-pointer' : ''}`}

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
                        <div className={`${styles.items} w-full flex flex-row gap-5 justify-center items-center`}>
                            {
                                data.map((item, i) => (
                                    <SavedAddressCard
                                        key={i}
                                        addressBook={item}
                                        select={toggleEditedAddress}
                                        onClick={handleCardSelected}
                                        isSelected={isPicked && selectedData.id === item.id}
                                        variant={clicked ? 'list' : ""}
                                    />
                                ))
                            }

                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    {renderMenus()}
                </div>
            </>
        </>
    )
}
