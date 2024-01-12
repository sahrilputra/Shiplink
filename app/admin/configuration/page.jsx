'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { TextInput } from 'flowbite-react'
import { SearchIcon } from '@/components/icons/iconCollection'
import { CarrierList } from './components/CarrierList'


export default function configuration() {

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <TextInput id="email4" type="text" rightIcon={SearchIcon} placeholder="Search..."
                            className='h-[25px] w-full bg-none text-zinc-500 text-xs font-normal outline-none border-zinc-500 focus:border-none focus:ring-0
                            items-center justify-center flex rounded-sm
                            '
                        />
                        <div className="w-[39px] h-[35px] p-2 bg-white rounded border border-neutral-200 justify-center items-center gap-2.5 inline-flex" />
                    </div>
                    <button className="w-[215px] h-10 px-8 bg-red-700 rounded shadow justify-center items-center gap-2 inline-flex">
                        <div className="text-white text-sm font-medium font-['Poppins']">Connect New Carrier</div>
                    </button>
                </div>

                <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                    <CarrierList />
                    <CarrierList />
                    <CarrierList />
                    <CarrierList />
                </div>

            </div>
        </>
    )
}
