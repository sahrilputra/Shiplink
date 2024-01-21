'use client'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
export const SavedQutoesCard = ({ variant, onSelect }) => {

    const toggleSelected = () => {
        onSelect(true);
    }

    return (
        <>
            {variant === 'list' ? (
                <>
                    <div
                        onClick={toggleSelected}
                        className={`container w-full px-[10px] py-[15px] relative rounded-lg shadow border border-zinc-600 border-opacity-50
                        ${onSelect === true ? "bg-blue-100" : " bg-none"}`}
                    >
                        <Checkbox className="absolute top-[10px] right-[10px]" />
                        <div className=" w-full flex-col justify-start items-start gap-[5px] inline-flex">
                            <div className="text-zinc-900 text-sm font-semibold ">Quote Date : 2023-09-02</div>
                            <div className="justify-between items-start flex flex-row w-full flex-wrap gap-[10px]">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-red-700 text-md font-semibold ">From</div>
                                        <div><span className="text-zinc-900 text-md font-medium ">John Doe |</span><span className="text-black text-md font-normal "> </span><span className="text-zinc-600 text-md font-normal ">123-456-7890</span></div>
                                    </div>
                                    <div className="text-[14px]"><span className="text-zinc-900  font-medium ">USA</span><span className="text-zinc-900 font-normal ">, New York, 123 Main St, ADDR-001, 12345</span></div>
                                    <div className=""><span className="text-zinc-900 text-sm font-medium ">Photo Frame |</span><span className="text-zinc-900 text-sm font-normal "> 8</span><span className="text-zinc-600 text-sm font-normal "> x</span><span className="text-zinc-900 text-sm font-normal "> 9 </span><span className="text-zinc-600 text-sm font-normal ">x</span><span className="text-zinc-900 text-sm font-normal "> 10 </span><span className="text-zinc-600 text-sm font-normal ">In</span><span className="text-zinc-900 text-sm font-normal ">, </span><span className="text-zinc-900 text-sm font-medium ">0.5 </span><span className="text-zinc-600 text-sm font-medium ">Ibs</span></div>
                                </div>
                                <Separator orientation="vertical" className="w-[1px] my-2 bg-zinc-600 bg-opacity-20 sm:hidden md:hidden" />
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-myBlue text-md font-semibold ">To</div>
                                        <div><span className="text-zinc-900 text-md font-medium ">John Doe |</span><span className="text-black text-md font-normal "> </span><span className="text-zinc-600 text-md font-normal ">123-456-7890</span></div>
                                    </div>
                                    <div className="text-[14px]"><span className="text-zinc-900  font-medium ">USA</span><span className="text-zinc-900 font-normal ">, New York, 123 Main St, ADDR-001, 12345</span></div>
                                    <div className=""><span className="text-zinc-900 text-sm font-medium ">Photo Frame |</span><span className="text-zinc-900 text-sm font-normal "> 8</span><span className="text-zinc-600 text-sm font-normal "> x</span><span className="text-zinc-900 text-sm font-normal "> 9 </span><span className="text-zinc-600 text-sm font-normal ">x</span><span className="text-zinc-900 text-sm font-normal "> 10 </span><span className="text-zinc-600 text-sm font-normal ">In</span><span className="text-zinc-900 text-sm font-normal ">, </span><span className="text-zinc-900 text-sm font-medium ">0.5 </span><span className="text-zinc-600 text-sm font-medium ">Ibs</span></div>
                                </div>
                                <div className="flex flex-col items-end justify-normal">
                                    <span className="text-zinc-900 text-lg font-normal leading-snug">
                                        Total
                                    </span>
                                    <span className="text-zinc-900 text-lg font-semibold leading-snug">$ 123.00</span></div>
                            </div>

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-[48%] px-[10px] py-2.5 bg-white rounded-lg shadow border border-zinc-600 border-opacity-50 flex-col justify-start items-center gap-[3px] inline-flex relative">
                        <Checkbox className="absolute top-[10px] right-[10px]" />
                        <div className="flex flex-col">
                            <div className="text-zinc-600 text-sm font-normal text-left flex justify-start w-[80%]">Shipment Date : 2023-09-02</div>
                            <div className=" justify-between items-start gap-[20px] flex flex-row flex-wrap">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-lg font-medium">From</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="text-black text-md font-medium">
                                            USA, New York
                                        </div>
                                        <div className='flex flex-row gap-[5px]'>
                                            <p className='text-black text-md font-medium '>John Doe |</p>
                                            <span className="text-zinc-600 text-md font-normal ">123-456-7890</span>
                                        </div>
                                        <div className=" text-zinc-600 text-sm font-normal underline">johndoe@example.com</div>
                                        <div className=" text-black text-sm font-normal ">123 Main St, ADDR-001, 12345</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-lg font-medium">To</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="text-black text-md font-medium">
                                            USA, New York
                                        </div>
                                        <div className='flex flex-row gap-[5px]'>
                                            <p className='text-black text-md font-medium '>John Doe |</p>
                                            <span className="text-zinc-600 text-md font-normal ">123-456-7890</span>
                                        </div>
                                        <div className=" text-zinc-600 text-sm font-normal underline">johndoe@example.com</div>
                                        <div className=" text-black text-sm font-normal ">123 Main St, ADDR-001, 12345</div>
                                    </div>
                                </div>
                            </div>

                            <Separator orientation="horizontal" className="w-[100%] h-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                            <div className="justify-between w-[100%] items-center gap-[18px] inline-flex">
                                <div className=" flex-col justify-start items-start inline-flex">
                                    <div className=" text-zinc-600 text-sm font-normal ">Photo Frame</div>
                                    <div className=" text-zinc-900 text-sm font-normal ">8x9x10 In</div>
                                    <div className="text-zinc-900 text-sm font-medium ">0.5 Ibs</div>
                                </div>
                                <Separator orientation="vertical" className="w-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className=" text-black text-sm font-normal ">Canada Post Regular Parcel</div>
                                    <div className="text-zinc-500 text-sm font-normal ">4 day</div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-end gap-[5px] flex">
                                <div className="text-right text-black text-lg font-medium ">Total $ 123</div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </>

    )

}
