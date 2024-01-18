import React from 'react'
import Image from 'next/image'

export const PaymentCards = () => {
    return (
        <>
            <div className=" w-[70%] px-[20px] py-[15px] shadow-md rounded-lg border border-zinc-600 border-opacity-50 justify-between items-center gap-[20px] flex flex-row">
                <div className="rounded-lg flex-col justify-start items-start gap-[5px] flex">
                    <div className="justify-center items-end gap-[5px] inline-flex">
                        <div className="w-[39px] h-[30px] text-black text-base font-semibold font-['Poppins'] leading-tight">****</div>
                        <div className="w-[39px] h-[30px] text-black text-base font-semibold font-['Poppins'] leading-tight">****</div>
                        <div className="w-[39px] h-[30px] text-black text-base font-semibold font-['Poppins'] leading-tight">****</div>
                        <div className="w-[72px] h-[30px] text-black text-base font-semibold font-['Poppins'] leading-tight">7567  </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-[9px] flex">
                        <div><span className="text-black text-md font-semibold">Jhon Smith</span></div>
                    </div>
                    <div className="text-zinc-600 text-sm font-normal">Explaind Valid to  May  2025 </div>
                </div>
                <div className="">
                    <Image
                        src={'/assets/payments/masterCard.png'}
                        width={50}
                        height={50}
                        alt='masterCard'
                    />
                </div>
            </div>
        </>
    )
}
