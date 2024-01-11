import React from 'react'
import Image from 'next/image'

export const Carrier = () => {
    return (
        <>
            <div className="pr-2.5 w-[100%] bg-white rounded-[5px] border border-neutral-200 justify-between items-center gap-[15px] inline-flex">
                <div className="justify-start items-center gap-[5px] flex">
                    <div className="w-14 h-14 p-[7px] justify-center items-center flex">
                        <Image
                            src={"/assets/courrier/canadian.png"}
                            width={42}
                            height={42}
                            alt='courrier'
                        />
                    </div>
                    <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div className="text-black text-[12px] font-normal font-['Poppins']">Canada Post Regular Parcel</div>
                        <div className="text-black text-[12px] font-semibold font-['Poppins']">CA$ 24.20</div>
                    </div>
                </div>
                <div className="text-zinc-500 text-[12px] font-normal font-['Poppins']">4 day</div>
            </div>
        </>
    )
}
