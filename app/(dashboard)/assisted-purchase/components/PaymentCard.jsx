'use client'
import React from 'react'

export const PaymentCard = () => {
    return (
        <>
            <div className="  px-5 py-[15px] bg-white rounded-lg shadow border border-neutral-200 border-opacity-90 justify-center items-center gap-[60px] inline-flex">
                <div className="rounded-lg flex-col justify-start items-start gap-[5px] inline-flex">
                    <div className="justify-center items-end gap-[5px] inline-flex">
                        <div className=" text-black text-base font-semibold font-['Poppins'] leading-tight">****</div>
                        <div className=" text-black text-base font-semibold font-['Poppins'] leading-tight">****</div>
                        <div className=" text-black text-base font-semibold font-['Poppins'] leading-tight">****</div>
                        <div className=" text-black text-base font-semibold font-['Poppins'] leading-tight">7567  </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-[9px] flex">
                        <div><span className="text-black text-base font-semibold font-['Poppins'] leading-tight">Jhon Smith</span><span className="text-black text-base font-normal font-['Poppins'] leading-tight"> </span></div>
                    </div>
                    <div className="text-zinc-600 text-base font-normal font-['Poppins'] leading-tight">Explaind Valid to  May  2025 </div>
                </div>
                <img className="" src="https://via.placeholder.com/72x35" />
                <div className="h-6 justify-start items-center gap-2 flex">
                    <div className="w-6 h-6 relative" />
                    <div></div>
                </div>
            </div>
        </>
    )
}
