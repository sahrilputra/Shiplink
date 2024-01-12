'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { CarrierList } from './(components)/carrierList'
import Image from 'next/image'
export default function configuration() {

    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div type='text' className="w-[329px]  h-10 px-[15px] py-2.5 bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                            <input
                                id='search'
                                type="text"
                                className='text-zinc-500 text-xs font-normal w-[90%] outline-none border-none focus:border-none focus:outline-none autofill:bg-none'
                                placeholder='Search ...'
                            />
                            <Image
                                src={'/icon/searchIcon.svg'}
                                width={20}
                                height={20}
                                alt='search icon'
                            />
                            {/* <SearchIcon className='' /> */}
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
