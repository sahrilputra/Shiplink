'use client'
import React, { useState } from 'react'
import ItemsPackage from '@/components/items/itemsPackage'
import styles from './styles.module.scss'
import { SearchIcon } from '@/components/icons/iconCollection'
import { CarrierList } from './(components)/carrierList'

export default function configuration() {

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div type='text' className="w-[329px]  h-10 px-[15px] py-2.5 bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                            <input
                                type="text"
                                id='search'
                                className='text-zinc-500 text-xs font-normal focus:outline-none w-[90%]'
                                placeholder='Search ...'
                            />
                            <SearchIcon className='' />
                        </div>
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
