'use client'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
export const SavedQuotesDetails = ({ data, handleClose }) => {

    return (
        <>
            <div className="w-[378px] min-w-full h-max min-full bg-white rounded-md px-[31px] py-[15px] ">
                <div className="flex flex-col">
                    <h1 className=' text-base font-bold'>Shipping Label Details</h1>
                    <div className="container-details flex flex-col text-sm">
                        <div className="text-black text-sm font-bold py-1">Ship From</div>
                        <div className="flex-col justify-start items-start flex text-zinc-600">
                            <div className="text-black text-sm">USA, New York</div>
                            <div className='text-zinc-600 text-xs'>John Doe | 123-456-7890</div>
                            <div className=" text-zinc-600 text-xs underline">johndoe@example.com</div>
                            <div className=" text-black text-xs">123 Main St, ADDR-001, 12345</div>
                            <div><span className="font-medium text-xs">Delivery Info : </span><span className="text-zinc-600 text-xs font-medium">Confirm Delivery</span></div>
                        </div>
                        <div className="text-black text-sm font-bold py-1">Ship To</div>
                        <div className="flex-col justify-start items-start flex text-zinc-600">
                            <div className="text-black text-sm">USA, New York</div>
                            <div className='text-zinc-600 text-xs'>John Doe | 123-456-7890</div>
                            <div className=" text-zinc-600 text-xs underline">johndoe@example.com</div>
                            <div className=" text-black text-xs">123 Main St, ADDR-001, 12345</div>
                            <div><span className="font-medium text-xs">Delivery Info : </span><span className="text-zinc-600 text-xs font-medium">Confirm Delivery</span></div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[3px] pt-2 flex">
                            <div className="text-black text-sm font-bold">Packaging</div>
                            <div className="w-56 text-zinc-600">Package</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[3px] pt-2 flex">
                            <div className="text-black text-sm font-bold">Reference</div>
                            <div className="w-56 text-zinc-600 text-sm">1232145151512</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[3px] pt-2 flex text-zinc-600">
                            <div className="text-black text-sm font-bold">Dimention and Weight</div>
                            <div className="text-xs">Type : General Dry</div>
                            <div className="text-xs">Size : Custom Size</div>
                            <div className="text-xs">Type : imperial</div>
                            <div className="text-xs">Dimension : 8x9x10 in</div>
                            <div className="text-xs">Weight : 0.5 Ibs</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[3px] pt-2 flex text-zinc-600">
                            <div className="text-black text-sm font-bold">Description</div>
                            <div className="text-xs">Hello World</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[3px] pt-2 flex text-zinc-600">
                            <div className="text-black text-sm font-bold">Qty : 1</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[3px] pt-2 flex text-zinc-600">
                            <div className="text-black text-sm font-bold">Insurance Amount : $12</div>
                            <div className="text-black text-sm font-bold">Rates : $24.20</div>
                        </div>
                        <div className="flex-col justify-start items-start pt-2 flex text-zinc-600">
                            <div className="text-black text-sm font-bold">Courrier</div>
                            <div className="text-xs">Canada Post Regular</div>
                            <div className="text-xs">Express</div>
                            <div className="text-xs">4 Days</div>
                        </div>
                        <div className="flex-col justify-end pt-2 flex w-full text-zinc-600">
                            <div className="text-black text-sm font-bold text-right">TOTAL : $ 123</div>
                            <Separator />
                        </div>
                    </div>


                    <div className="flex-row justify-between items-center pt-2 flex w-full text-zinc-600">
                        <Button
                            variant="redOutline"
                            size="sm"
                            onClick={handleClose}
                        >
                            <p className='text-xs'>Cancel</p>
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleClose}
                        >
                            <p className='text-xs'>Load Quote</p>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
