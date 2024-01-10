import React from 'react'
import Image from 'next/image'
export const PromoOne = () => {
    return (
        <>
            <div className="w-[378px] min-w-full h-[310px] relative bg-white rounded-md">
                <Image
                    src={'/assets/blue.png'}
                    width={500}
                    height={500}
                    alt='Blue Bg'
                    className='bg-cover h-[304px] left-0 top-[11px] absolute opacity-80 rounded-[9px]'
                />
                <div className="left-[43px] top-[60px] absolute backdrop-blur-[156px] flex-col justify-start items-center gap-px inline-flex">
                    <div className="text-zinc-600 text-3xl font-normal font-['Poppins']">Your Status</div>
                    <div className="text-zinc-900 text-[26px] font-semibold font-['Poppins']">Premium</div>
                    <div className="text-stone-900 text-xl font-normal font-['Poppins']">Level 2 Discount Bonus</div>
                    <div className=" h-12 px-10 bg-red-700 rounded shadow justify-center items-center gap-2 inline-flex">
                        <div className="text-white text-lg font-semibold font-['Poppins']">Upgrade</div>
                    </div>
                </div>
            </div>
        </>
    )
}
