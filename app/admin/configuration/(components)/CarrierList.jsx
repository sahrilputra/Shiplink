'use client'
import React from 'react'
import Image from 'next/image'
export const CarrierList = () => {
    return (
        <>
            <div className="w-[100%] h-[61px] px-2.5 py-[5px] bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                <div className="px-10 justify-start items-center gap-[100px] flex">
                    <div className="w-[105px] p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
                        <Image
                            src={'/assets/courrier/feedex.png'}
                            width={80}
                            height={30}
                            alt='feedex icon'
                        />
                    </div>
                    <div className="justify-start items-center gap-[54px] flex">
                        <div className="justify-center items-center gap-[41px] flex">
                            <div className="h-[21px] justify-start items-end gap-[120px] flex">
                                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">FedEx</div>
                            </div>
                        </div>
                        <div className="justify-center items-center gap-[41px] flex">
                            <div className="h-[21px] justify-start items-end gap-[120px] flex">
                                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">U.S Domestic</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-7 justify-between items-center flex">
                    <div className="h-4 p-[3px] origin-top-left rotate-180 bg-sky-700 rounded-[84px] justify-start items-start gap-2.5 flex">
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                    <div className="justify-start items-start gap-[5px] flex">
                        <button className="px-2.5 py-[5px] bg-sky-50 rounded justify-center items-center gap-2.5 flex">
                            <p className="text-secondary text-xs font-medium font-['Poppins']">Edit</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
