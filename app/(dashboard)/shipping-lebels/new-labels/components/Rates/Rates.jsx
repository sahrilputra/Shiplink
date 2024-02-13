import React from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
export const Rates = () => {
    return (
        <>
            <div className="w-[378px] min-w-full h-full p-3 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className='font-bold '>Rates</p>
                    <div className="border border-[#5a5a5a] p-1 text-xs">
                        Refresh
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="px-3 py-1 border border-red-600 bg-red-100 w-max">
                        <p className='text-xs text-red-700'>Cheapest</p>
                    </div>
                    <div className="px-3 py-1 border border-red-600 bg-red-100 w-max">
                        <p className='text-xs text-red-700'>Cheapest</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="p-1.5 flex flex-row gap-3 border border-zinc-300 rounded items-center">
                        <Image
                            alt='carrier'
                            src='/assets/home/labels/icon/1.png'
                            width={40}
                            height={40}
                            style={{ width: 40, height: 40 }}
                        />
                        <div className="flex flex-col gap-2 tex-xs w-full">
                            <p className='text-xs'>Canada Post Regular Parcel</p>
                            <div className="flex justify-between items-center text-xs w-full">
                                <p className='text-[10px]'>2 - 3 Days</p>
                                <p className='text-bold '>CA$ 24.20</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
