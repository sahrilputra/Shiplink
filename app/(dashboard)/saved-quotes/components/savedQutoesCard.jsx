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
                        className={`container w-full px-[15px] py-[15px] relative rounded-lg shadow border border-zinc-600/40
                        hover:bg-slate-200/30 cursor-pointer
                        ${onSelect === true ? "bg-blue-100" : " bg-none"}`}
                    >
                        <Checkbox className="absolute top-[10px] right-[10px]" />
                        <div className=" w-full flex-col justify-start items-start gap-[5px] inline-flex">
                            <div className="text-zinc-900 text-xs font-bold ">Quote Date : {data.date}</div>
                            <div className="justify-between items-start flex flex-row w-full flex-wrap">
                                <div className="flex-col w-[400px] justify-start items-start leading-tight inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-red-700 text-sm font-bold ">From</div>
                                        <div><span className="text-zinc-900 font-bold text-sm ">{data.shipFrom.contact.name} | </span>
                                            <span className="text-zinc-600 text-sm font-normal ">{data.shipFrom.contact.phone}</span>
                                        </div>
                                    </div>
                                    <div className="text-[14px]">
                                        <span className=" text-zinc-900 text-xs font-semibold">{data.shipFrom.location}, </span>
                                        <span className='text-zinc-500 text-xs font-normal'>
                                            {data.shipFrom.address}
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="text-zinc-900 text-sm font-medium ">{data.description} |</span>
                                        <span className="text-zinc-400 text-xs font-normal "> {data.dimensionAndWeight.dimensions}, </span>
                                        <span className="text-zinc-400 text-xs font-medium ">{data.dimensionAndWeight.weight}</span>
                                    </div>
                                </div>
                                <div className="h-[50px] ">
                                    <Separator orientation="vertical" className="h-full w-[2px]" />
                                </div>
                                <div className="flex-col w-[400px] justify-start items-start inline-flex leading-tight">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-myBlue text-sm font-bold ">To</div>
                                        <div>
                                            <span className="text-zinc-900 text-sm font-bold ">{data.shipTo.contact.name} | </span>
                                            <span className="text-zinc-600 text-sm font-normal ">{data.shipTo.contact.phone}</span></div>
                                    </div>
                                    <div className="">
                                        <span className="text-zinc-900 text-xs font-semibold ">{data.shipTo.location} </span>
                                        <span className="text-zinc-500 text-xs font-normal ">{data.shipTo.address}</span>
                                    </div>
                                    <div className=""><span className="text-zinc-900 text-xs font-bold ">{data.rates.carrier}, <span className="text-zinc-500 text-sm font-normal ">{data.rates.duration}</span> </span></div>
                                </div>
                                <div className="flex flex-col items-end justify-normal p-3">
                                    <span className="text-zinc-900 text-sm font-normal leading-snug">
                                        Total
                                    </span>
                                    <span className="text-zinc-900 text-sm font-bold leading-snug">{data.insuranceAmount}.00</span></div>
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
                            <div className="text-zinc-900 text-xs font-bold text-left flex justify-start w-[80%]">Quote Date : {data.date}</div>
                            <div className=" justify-between items-center gap-[20px] flex flex-row flex-wrap">
                                <div className="flex-col justify-center items-start inline-flex w-[250px] p-2">
                                    <div className="text-zinc-900 font-bold text-sm">From</div>
                                    <p className='text-zinc-900 text-md font-bold text-sm'>{data.shipFrom.contact.name}</p>
                                    <p className="text-zinc-600  font-regular text-sm">{data.shipFrom.contact.phone} </p>
                                    <p className=" text-zinc-600 text-xs font-regular underline">{data.shipFrom.contact.email}</p>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="text-zinc-500 font-medium text-xs">
                                            {data.shipFrom.location}
                                        </div>
                                        <div className=" text-zinc-500 font-medium text-xs ">{data.shipFrom.address}</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-center items-start inline-flex w-[250px] p-2">
                                    <div className="text-zinc-900 text-sm font-bold">To</div>
                                    <p className='text-zinc-900 text-sm font-bold '>{data.shipTo.contact.name}</p>
                                    <p className="text-zinc-600 text-sm font-regular ">{data.shipTo.contact.phone} </p>
                                    <p className=" text-zinc-600 text-xs font-regular underline">{data.shipTo.contact.email}</p>

                                    <div className="flex-col justify-start items-start flex">
                                        <div className="text-zinc-500 font-medium text-xs">
                                            {data.shipTo.location}
                                        </div>
                                        <div className=" text-zinc-500 font-medium text-xs ">{data.shipTo.address}</div>
                                    </div>
                                </div>
                            </div>

                            <Separator orientation="horizontal" className="w-[100%] h-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                            <div className="justify-between w-[100%] items-center gap-[18px] inline-flex">
                                <div className=" flex-col justify-start items-start inline-flex w-[250px] p-2">
                                    <div className=" text-zinc-900 text-sm font-bold ">{data.description}</div>
                                    <div className=" text-zinc-500 text-xs font-normal ">{data.dimensionAndWeight.dimensions}</div>
                                    <div className="text-zinc-500 text-xs font-normal ">{data.dimensionAndWeight.weight}</div>
                                </div>
                                <Separator orientation="vertical" className="w-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                                <div className="flex-col justify-start items-start inline-flex w-[250px] p-2">
                                    <div className=" text-zinc-900 font-bold text-sm ">{data.rates.carrier}</div>
                                    <div className="text-zinc-500 text-xs font-normal ">{data.rates.duration}</div>
                                </div>
                            </div>
                            <div className="flex w-[100%] flex-row items-end gap-2 justify-end text-right">
                                <p className='font-normal text-sm'>Total</p>
                                <div className="text-right text-zinc-900 text-sm font-bold ">{data.insuranceAmount}.00</div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </>

    )

}
