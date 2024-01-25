'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { PARSForms } from './components/forms/PARSForms'
import { Separator } from '@/components/ui/separator'
import data from '../../../data/admin/PARSData.json'
import { PARSTable } from './components/ListTable/PARSTabled'
export default function PARSPage() {
    const [clicked, isClicked] = useState(false);
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                    <div className="flex flex-col gap-3 w-[100%]">
                        <div className="p-1 rounded-md border w-max border-neutral-200 justify-start items-start gap-2.5 inline-flex ">
                            <button
                                id='savedAddress'
                                className={`font-normal px-2.5 py-[8px]   w-[100px]  justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                                onClick={() => toggleClicked(false)}
                            >
                                <p className=" text-xs font-['Poppins'] leading-tight">PARS</p>
                            </button>
                            <button
                                id='newAddress'
                                className={`font-normal px-2.5 py-[8px]  w-[100px]  justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-red-700 text-white font-semiBold hover:bg-red-800' : 'bg-none'}`}
                                onClick={() => toggleClicked(true)}
                            >
                                <p className=" text-xs font-['Poppins'] leading-tight">PAPS</p>
                            </button>
                        </div>
                        <div className="px-2">
                            <PARSForms />
                        </div>
                    </div>
                </div>
                <div className="w-full py-5 px-2">
                    <Separator className="h-[3px]" />
                </div>
                <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                    <PARSTable data={data} />
                </div>

            </div>
        </>
    )
}
