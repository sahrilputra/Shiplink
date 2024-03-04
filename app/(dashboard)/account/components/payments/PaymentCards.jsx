'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
export const PaymentCards = ({ item }) => {
    return (
        <>
            <div
                className="  bg-white rounded-lg shadow border border-neutral-200 border-opacity-90 w-full">
                <div className="px-5 py-[15px] w-full justify-between items-center gap-[30px] inline-flex">
                    <div className="rounded-lg flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="justify-center items-end gap-[5px] inline-flex">
                            <div className=" text-zinc-900 text-sm font-semibold leading-tight">
                                {item?.card_number.replace(/\d{4}(?=\d{4})/g, '**** ')}
                            </div>
                            <div className=" text-zinc-900 text-sm font-bold leading-tight">{item?.card_number.slice(-4)}</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[9px] flex">
                            <div><span className="text-zinc-900 text-sm font-bold leading-tight">{item?.name_on_card} </span></div>
                        </div>
                        <div className="text-zinc-600 text-xs font-normal leading-tight">Explaind Valid to {item?.valid_through} </div>
                    </div>

                    <div className="w-[60px] justify-end items-end ">
                        <Image
                            src={'/assets/payments/masterCard.png'}
                            width={50}
                            height={50}
                            alt='masterCard'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
