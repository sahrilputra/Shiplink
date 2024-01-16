'use client'
import React, { useState } from 'react'

export const SavedQuotesDetails = () => {

    return (
        <>
            <div className="w-[378px] min-w-full h-full px-[31px] pt-[18px] bg-white rounded-md ">
                <div className="mt-2 flex flex-col gap-[20px]">
                    <h1 className=' text-lg font-bold '>Shipping Label</h1>

                    <div className="container-details flex flex-col">
                        <div className="text-black text-md emibold">Ship From</div>
                        <div className="flex-col justify-start items-start flex">
                            <div className="w-[201px]"><span className="text-black text-lg font-medium">USA</span><span className="text-black text-lg ormal">, New York</span></div>
                            <div><span className="text-black text-base font-medium">John Doe |</span><span className="text-black text-lg ormal"> </span><span className="text-zinc-600 text-base ormal">123-456-7890</span><span className="text-black text-lg ormal"> </span></div>
                            <div className="w-[201px] text-zinc-600 text-sm ormal underline">johndoe@example.com</div>
                            <div className="w-[201px] text-black text-sm ormal">123 Main St, ADDR-001, 12345</div>
                            <div><span className="text-zinc-900 text-base font-medium">Delivery Info : </span><span className="text-zinc-600 text-base font-medium">Confirm Delivery</span></div>
                        </div>
                        <div className="flex-col justify-start items-start flex">
                            <div className="w-[216px] text-black text-lg emibold">Ship To</div>
                            <div className="flex-col justify-start items-start flex">
                                <div><span className="text-black text-lg font-medium">Canada</span><span className="text-black text-lg ormal">, Toronto</span></div>
                                <div><span className="text-black text-base font-medium">Jane Smith |</span><span className="text-black text-lg ormal"> </span><span className="text-zinc-600 text-base ormal">987-654-3210</span></div>
                                <div className="text-zinc-600 text-sm ormal underline">janesmith@example.com</div>
                                <div className="text-black text-sm ormal">456  Elm St, ADDR-002, M1X 2Y3</div>
                            </div>
                            <div className="w-[216px]"><span className="text-zinc-900 text-base font-medium">Delivery Info : </span><span className="text-zinc-600 text-base font-medium">Residential</span></div>
                        </div>
                        <div className="flex-col justify-start items-start gap-px flex">
                            <div className="text-black text-lg emibold">Packaging</div>
                            <div className="w-56 text-zinc-600 text-base ormal">Package</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-px flex">
                            <div className="text-black text-lg emibold">Reference</div>
                            <div className="w-56 text-zinc-600 text-base ormal">1232145151512</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-px flex">
                            <div className="text-black text-lg emibold">Dimention and Weight</div>
                            <div className="w-56 text-zinc-600 text-base ormal leading-tight">Type : General Dry<br />Custom Size<br />imperial<br />8x9x10 in<br />0.5 Ibs</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-px flex">
                            <div className="text-black text-lg emibold">Description</div>
                            <div className="w-56 text-zinc-600 text-base ormal leading-tight">Hello World</div>
                        </div>
                        <div className="text-black text-lg emibold">Qty : 1</div>
                        <div className="flex-col justify-start items-start gap-px flex">
                            <div className="w-[213px] text-black text-lg emibold">Insurance Amount : $12</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-px flex">
                            <div className="text-black text-lg emibold">Rates : $24.20</div>
                            <div className="w-56 text-zinc-600 text-base ormal leading-tight">Canada Post Regular Parcel<br />4 Days</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
