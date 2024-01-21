'use client'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
export const SavedQutoesCard = ({ variant, onSelect, data }) => {


    const toggleSelected = () => {
        onSelect(data.id);
        console.log(data.id);
    }

    const handleClick = () => {
        console.log(data.id); // Get the data id when the card is clicked
    }



    return (
        <>
            {variant === 'list' ? (
                <>
                    <div
                        onClick={toggleSelected}
                        className={`container w-full px-[10px] py-[15px] relative rounded-lg shadow border border-zinc-600 border-opacity-50
                        hover:bg-slate-200/30 cursor-pointer
                        ${onSelect === true ? "bg-blue-100" : " bg-none"}`}
                    >
                        <Checkbox className="absolute top-[10px] right-[10px]" />
                        <div className=" w-full flex-col justify-start items-start gap-[5px] inline-flex">
                            <div className="text-zinc-900 text-sm font-semibold ">Quote Date : {data.date}</div>
                            <div className="justify-between items-start flex flex-row w-full flex-wrap gap-[10px]">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-red-700 text-md font-semibold ">From</div>
                                        <div><span className="text-zinc-900 text-md font-medium ">{data.shipFrom.contact.name} |</span><span className="text-black text-md font-normal "> </span><span className="text-zinc-600 text-md font-normal ">{data.shipFrom.contact.phone}</span></div>
                                    </div>
                                    <div className="text-[14px]"><span className="text-zinc-900 font-normal ">{data.shipFrom.location}, {data.shipFrom.address}</span></div>
                                    <div className=""><span className="text-zinc-900 text-sm font-medium ">{data.description} |</span>
                                        <span className="text-zinc-900 text-sm font-normal "> {data.dimensionAndWeight.dimensions}, </span>
                                        <span className="text-zinc-900 text-sm font-medium ">{data.dimensionAndWeight.weight}</span></div>
                                </div>
                                <Separator orientation="vertical" className="w-[1px] my-2 bg-zinc-600 bg-opacity-20 sm:hidden md:hidden" />
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-myBlue text-md font-semibold ">To</div>
                                        <div>
                                            <span className="text-zinc-900 text-md font-medium ">{data.shipTo.contact.name} |</span>
                                            <span className="text-zinc-600 text-md font-normal ">{data.shipTo.contact.phone}</span></div>
                                    </div>
                                    <div className="text-[14px]"><span className="text-zinc-900  font-medium ">{data.shipTo.location}</span><span className="text-zinc-900 font-normal ">, {data.shipTo.address}</span></div>
                                    <div className=""><span className="text-zinc-900 text-sm font-medium ">{data.rates.carrier}, {data.rates.duration}</span></div>
                                </div>
                                <div className="flex flex-col items-end justify-normal">
                                    <span className="text-zinc-900 text-lg font-normal leading-snug">
                                        Total
                                    </span>
                                    <span className="text-zinc-900 text-lg font-semibold leading-snug">{data.insuranceAmount}</span></div>
                            </div>

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        onClick={toggleSelected}
                        className={`
                        ${onSelect === true ? "bg-blue-100" : " bg-none"}
                        hover:bg-slate-200/20 cursor-pointer 
                        w-[48%] px-[10px] py-2.5  rounded-lg shadow border border-zinc-600 border-opacity-50 flex-col justify-start items-center gap-[3px] inline-flex relative`}
                    >

                        <Checkbox className="absolute top-[10px] right-[10px]" />
                        <div className="flex flex-col">
                            <div className="text-zinc-600 text-sm font-normal text-left flex justify-start w-[80%]">Quote Date : {data.date}</div>
                            <div className=" justify-between items-start gap-[20px] flex flex-row flex-wrap">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-lg font-medium">From</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="text-black text-md font-medium">
                                            {data.shipFrom.location}
                                        </div>
                                        <div className='flex flex-row gap-[5px]'>
                                            <p className='text-black text-md font-medium '>{data.shipFrom.contact.name}</p>
                                            <span className="text-zinc-600 text-md font-normal ">{data.shipFrom.contact.phone} </span>
                                        </div>
                                        <div className=" text-zinc-600 text-sm font-normal underline">{data.shipFrom.contact.email}</div>
                                        <div className=" text-black text-sm font-normal ">{data.shipFrom.address}</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-lg font-medium">From</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="text-black text-md font-medium">
                                            {data.shipTo.location}
                                        </div>
                                        <div className='flex flex-row gap-[5px]'>
                                            <p className='text-black text-md font-medium '>{data.shipTo.contact.name}</p>
                                            <span className="text-zinc-600 text-md font-normal ">{data.shipTo.contact.phone} </span>
                                        </div>
                                        <div className=" text-zinc-600 text-sm font-normal underline">{data.shipTo.contact.email}</div>
                                        <div className=" text-black text-sm font-normal ">{data.shipTo.address}</div>
                                    </div>
                                </div>
                            </div>

                            <Separator orientation="horizontal" className="w-[100%] h-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                            <div className="justify-between w-[100%] items-center gap-[18px] inline-flex">
                                <div className=" flex-col justify-start items-start inline-flex">
                                    <div className=" text-zinc-600 text-sm font-normal ">{data.description}</div>
                                    <div className=" text-zinc-900 text-sm font-normal ">{data.dimensionAndWeight.dimensions}</div>
                                    <div className="text-zinc-900 text-sm font-medium ">{data.dimensionAndWeight.weight}</div>
                                </div>
                                <Separator orientation="vertical" className="w-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className=" text-black text-sm font-normal ">{data.rates.carrier}</div>
                                    <div className="text-zinc-500 text-sm font-normal ">{data.rates.duration}</div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-end gap-[5px] flex">
                                <div className="text-right text-black text-lg font-medium ">Total {data.insuranceAmount}</div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </>

    )

}
