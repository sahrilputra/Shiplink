'use client'
import React from 'react'
import Image from 'next/image'
export const PaymentCard = () => {
    return (
        <>
            <div className="  bg-white rounded-lg shadow border border-neutral-200 border-opacity-90 w-full">
                <div className="px-5 py-[15px]  juify-between items-center gap-[30px] inline-flex">
                    <div className="rounded-lg flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="justify-center items-end gap-[5px] inline-flex">
                            <div className=" text-black text-base font-semibold leading-tight">**** **** **** </div>
                            <div className=" text-black text-base font-semibold leading-tight">7567  </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[9px] flex">
                            <div><span className="text-black text-base font-semibold leading-tight">Jhon Smith</span></div>
                        </div>
                        <div className="text-zinc-600 text-base font-normal leading-tight">Explaind Valid to  May  2025 </div>
                    </div>

                    <Image
                        src={'/assets/payments/masterCard.png'}
                        width={50}
                        height={50}
                        alt='masterCard'
                    />

                </div>
            </div>
        </>
    )
}
