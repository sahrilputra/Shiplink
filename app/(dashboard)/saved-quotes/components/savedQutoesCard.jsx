import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
export const SavedQutoesCard = ({ variant }) => {
    return (
        <>
            {variant === 'list' ? (
                <>
                    <div className="container w-full px-[30px] py-[30px] relative bg-white rounded-lg shadow border border-zinc-600 border-opacity-50">
                        <Checkbox className="absolute top-[25px] right-[20px]" />
                        <div className=" w-full flex-col justify-start items-start gap-[5px] inline-flex">
                            <div className="text-zinc-900 text-sm font-semibold ">Quote Date : 2023-09-02</div>
                            <div className="justify-between items-start flex flex-row w-full flex-wrap gap-[10px]">
                                <div className="flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-red-700 text-lg font-semibold ">From</div>
                                        <div><span className="text-zinc-900 text-lg font-medium ">John Doe |</span><span className="text-black text-lg font-normal "> </span><span className="text-zinc-600 text-base font-normal ">123-456-7890</span><span className="text-black text-lg font-normal "> </span></div>
                                    </div>
                                    <div className=""><span className="text-zinc-900 text-base font-medium ">USA</span><span className="text-zinc-900 text-base font-normal ">, New York, 123 Main St, ADDR-001, 12345</span></div>
                                    <div className=""><span className="text-zinc-900 text-sm font-medium ">Photo Frame |</span><span className="text-zinc-900 text-sm font-normal "> 8</span><span className="text-zinc-600 text-sm font-normal "> x</span><span className="text-zinc-900 text-sm font-normal "> 9 </span><span className="text-zinc-600 text-sm font-normal ">x</span><span className="text-zinc-900 text-sm font-normal "> 10 </span><span className="text-zinc-600 text-sm font-normal ">In</span><span className="text-zinc-900 text-sm font-normal ">, </span><span className="text-zinc-900 text-sm font-medium ">0.5 </span><span className="text-zinc-600 text-sm font-medium ">Ibs</span></div>
                                </div>
                                <Separator orientation="vertical" className="w-[1px] my-2 bg-zinc-600 bg-opacity-20 sm:hidden md:hidden" />
                                <div className="flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-sky-700 text-lg font-semibold ">To</div>
                                        <div><span className="text-zinc-900 text-lg font-medium ">Jane Smith |</span><span className="text-black text-lg font-normal "> </span><span className="text-zinc-600 text-base font-normal ">987-654-3210</span></div>
                                    </div>
                                    <div className=""><span className="text-zinc-900 text-base font-medium ">Canada</span><span className="text-zinc-900 text-base font-normal ">, Toronto, 456 Elm St, ADDR-002, M1X </span></div>
                                    <div className=""><span className="text-zinc-900 text-sm font-normal ">Canada Post Regular Parcel</span><span className="text-black text-sm font-normal ">, </span><span className="text-zinc-600 text-sm font-medium ">4 day</span></div>
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
                    <div className="w-[40%] px-[20px] py-2.5 bg-white rounded-lg shadow border border-zinc-600 border-opacity-50 flex-col justify-start items-center gap-[3px] inline-flex relative">
                        <Checkbox className="absolute top-[25px] right-[20px]" />
                        <div className="flex flex-col">
                            <div className="text-zinc-600 text-base font-normal text-left flex justify-start w-[100%]">Shipment Date : 2023-09-02</div>
                            <div className=" justify-between items-start gap-[20px] flex flex-row flex-wrap md:gap-[30px]">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-lg font-medium">From</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="w-[201px]"><span className="text-black text-lg font-medium ">USA</span><span className="text-black text-lg font-normal ">, New York</span></div>
                                        <div><span className="text-black text-base font-medium ">John Doe |</span><span className="text-black text-lg font-normal "> </span><span className="text-zinc-600 text-base font-normal ">123-456-7890</span><span className="text-black text-lg font-normal "> </span></div>
                                        <div className="w-[201px] text-zinc-600 text-sm font-normal  underline">johndoe@example.com</div>
                                        <div className="w-[201px] text-black text-sm font-normal ">123 Main St, ADDR-001, 12345</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-black text-lg font-medium ">To</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div><span className="text-black text-lg font-medium ">Canada</span><span className="text-black text-lg font-normal ">, Toronto</span></div>
                                        <div><span className="text-black text-base font-medium ">Jane Smith |</span><span className="text-black text-lg font-normal "> </span><span className="text-zinc-600 text-base font-normal ">987-654-3210</span></div>
                                        <div className="text-zinc-600 text-sm font-normal  underline">janesmith@example.com</div>
                                        <div className="text-black text-sm font-normal ">456 Elm St, ADDR-002, M1X 2Y3</div>
                                    </div>
                                </div>
                            </div>

                            <Separator orientation="horizontal" className="w-[100%] h-[2px] my-2 bg-zinc-600 bg-opacity-20" />
                            <div className="justify-between w-[100%] items-center gap-[18px] inline-flex">
                                <div className=" flex-col justify-start items-start inline-flex">
                                    <div className=" text-zinc-600 text-base font-normal ">Photo Frame</div>
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
