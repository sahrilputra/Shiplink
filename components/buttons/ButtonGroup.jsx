import React from 'react'
import { PlusIcons } from '../icons/iconCollection'
import Image from 'next/image'
export const ButtonAddOtherContent = () => {
    return (
        <>
            <button className=" bg-blue-light-button px-[15px] py-[5px] flex flex-row text-secondary gap-[10px] w-max items-center justify-center rounded-md text-sm">
                <PlusIcons />
                <p>Add Other Content</p>
            </button>
        </>
    )
}


export const SelectBorderButtons = () => {
    return (
        <div className="w-[262px] h-9 rounded-lg justify-start items-start inline-flex">
            <div className="w-[100px] h-9 px-2.5 py-2 bg-green-500 rounded-tl rounded-bl justify-start items-start gap-2.5 flex">
                <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Select Broker</div>
            </div>
            <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-between items-center flex">
                <div className="text-zinc-400 text-xs font-medium font-['Poppins'] leading-tight">Use Own Broker</div>
                <div className="w-[19px] h-[19px] relative">
                    <Image
                        src={"/icon/ArrowBold.svg"}
                        width={15}
                        height={15}
                        alt='arrow bottom'
                    />
                    <div className="w-7 h-[26px] left-[-4px] top-[-4px] absolute bg-zinc-900" />
                </div>
            </div>
        </div>
    )
}