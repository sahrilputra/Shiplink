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


export const SelectBroker = () => {
    return (
        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
            <div className="w-[100px] h-9 px-1 py-2 bg-green-500 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Select Broker</div>
            </div>
            <button className="text-zinc-400 text-xs font-normal font-['Poppins'] gap-1
                h-9 px-1.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-center items-center flex ">
                <p>Use Own Broker</p>
                <div className="">
                    <Image
                        src={"/icon/BoldArrow.svg"}
                        width={15}
                        height={15}
                        alt='arrow bottom'
                    />
                </div>
            </button>
        </div>
    )
}

export const ButtonUploadInvoice = () => {
    return (
        <div className="h-9 rounded-lg justify-start items-start inline-flex">
            <div className="w-[100px] h-9 px-2.5 py-2 bg-zinc-400 rounded-tl rounded-bl justify-center items-center gap-2.5 flex">
                <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Invoice</div>
            </div>
            <button className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-start items-center gap-[29px] flex">
                <div className="text-zinc-400 text-xs font-normal font-['Poppins']  leading-tight">Upload Invoice</div>
            </button>
        </div>
    )
}

export const ButtonPARS = () => {
    return (
        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
            <div className="w-[100px] h-9 px-2.5 py-2 bg-neutral-900 rounded-tl rounded-bl justify-center items-center gap-2.5 flex">
                <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">PARS/PAPS</div>
            </div>
            <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-start items-center gap-[29px] flex">
                <div className="text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight">12313131231</div>
            </div>
        </div>
    )
}

export const ButtonEntryNumber = () => {
    return (
        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
            <div className="w-[100px] h-9 px-1.5 py-2 bg-secondary rounded-tl rounded-bl justify-center items-center gap-2.5 flex">
                <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Entry Number</div>
            </div>
            <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 first-line:justify-center items-center gap-[29px] flex">
                <div className="text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight">1231321</div>
            </div>
        </div>
    )
}

export const SelectWarehouse = () => {
    return (
        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
            <div className="w-[100px] h-9 px-2.5 py-2 bg-secondary rounded-tl rounded-bl justify-start gap-2.5 flex items-center">
                <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Warehouse</div>
            </div>
            <button className="text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight gap-2
                h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-center items-center flex ">
                <p>WR Toronto</p>
                <div className="w-[19px] h-[19px] relative">
                    <Image
                        src={"/icon/BoldArrow.svg"}
                        width={15}
                        height={15}
                        alt='arrow bottom'
                    />
                </div>
            </button>
        </div>
    )
}