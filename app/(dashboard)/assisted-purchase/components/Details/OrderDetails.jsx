'use client'
import React, { useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
export const OrderDetails = ({ data, onClose }) => {
    console.log("data", data?.Qty)
    return (
        <>
            <div className="px-[10px] w-full py-2.5 flex-col justify-start items-center inline-flex">
                <div className="p-2.5 justify-between items-center inline-flex w-full">
                    <div className="flex-col justify-start items-start inline-flex">
                        <div className="text-zinc-900 text-xl font-bold ">Product Details</div>
                        <div className="text-zinc-600 text-opacity-50 font-medium"></div>
                    </div>
                    <div className="w-[90px] h-[31px] px-3 py-0.5 bg-orange-300 bg-opacity-75 rounded-[3px] border border-amber-300 justify-center items-center gap-2.5 flex">
                        <div className="text-amber-500 text-sm font-medium font-['Poppins']">{data?.status}</div>
                    </div>
                </div>
                <div className="w-full py-4">
                    <Separator className="py-[1px]" />
                </div>
                <div className="flex-col w-full gap-[5px] flex px-[20px] py-[10px]  ">
                    <div className="flex flex-row justify-between w-full text-gray-500">
                        <p className='w-[50%] text-black'>Payments Method</p>
                        <p className='w-[50%]'>Visa, *** 3372</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Date</p>
                        <p className='w-[50%]'>{data?.date}</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Product Link</p>
                        <p className='w-[50%] text-myBlue underline'>Link</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Product</p>
                        <p className='w-[50%]'>{data?.productName}</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Qty</p>
                        <p className='w-[50%]'>{data?.Qty}</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Product Price</p>
                        <p className='w-[50%]'>{data?.productPrice}</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Total</p>
                        <p className='w-[50%]'>{data?.priceAmount}</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Processing Fee</p>
                        <p className='w-[50%]'>$80.00</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Total Amount</p>
                        <p className='w-[50%]'>{data?.priceAmount}</p>
                    </div>
                    <div className="flex flex-row w-full text-gray-500">
                        <p className='w-[50%] text-black'>Invoice</p>
                        <p className='w-[50%] text-myBlue underline'>Link</p>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-evenly gap-3 py-3">
                    <Button
                        variant="redOutline"
                        onClick={onClose}
                    >
                        <p>Close</p>
                    </Button>
                    <Button
                        variant="destructive"
                    >
                        <p>Order Again</p>
                    </Button>
                </div>
            </div>
        </>
    )
}
