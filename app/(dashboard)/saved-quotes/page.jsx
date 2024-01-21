'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { PromoOne } from '@/components/ads/promoOne'
import { Button } from '@/components/ui/button'
import { DeleteIcons, IconList, GridIcons, FilterIcons } from '@/components/icons/iconCollection'
import { PlusIcon } from 'lucide-react'
import { SearchBar } from '@/components/ui/searchBar'
import { SavedQutoesCard } from './components/savedQutoesCard'
import { SavedQuotesDetails } from './components/SavedQuotesDetails'
import data from '../../../data/savedQuotesData.json'

export default function SavedQuotes() {
    const [selectedData, setSelectedData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCardSelected = (id) => {
        console.log("my id is", id)
        const selectedAddress = data.find(item => item.id === id);
        setIsOpen(true);
        setSelectedData(selectedAddress);
    }
    const handleClose = () => {
        setIsOpen(false);
    }


    const [clicked, isClicked] = useState(false);

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
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
                        </div>
                    </div>

                </div>
                <div className={styles.item_container}>
                    <div className={styles.items}>
                        <>
                            {
                                data.map((item, i) => (
                                    <>
                                        <SavedQutoesCard
                                            key={i}
                                            variant={clicked ? 'list' : ""}
                                            onSelect={handleCardSelected}
                                            className="hover:bg-green-400"
                                            data={item}
                                        />
                                    </>
                                ))
                            }
                        </>
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
                {
                    isOpen ? (
                        <>
                            <SavedQuotesDetails data={selectedData} handleClose={handleClose} />

                        </>
                    ) : (
                        <>
                            <div className="ads">
                                <PromoOne />
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}
