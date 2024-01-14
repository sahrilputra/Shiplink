import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowDownIcon } from '@/components/icons/iconCollection'


export const SelectBroker = ({ props }) => {
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <Select className="flex flex-row gap-0 items-center">
                    <div className="w-[100px] h-9 px-1 py-2 bg-green-500 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                        <div className="text-white text-xs leading-tight">Select Broker</div>
                    </div>
                    <SelectTrigger className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400">
                        <SelectValue placeholder="Choose Broker" />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                        <SelectItem
                            className="text-xs"
                            value="Shiplink Broker"
                        >
                            Use Shiplink Broker
                        </SelectItem>
                        <SelectItem
                            value="Own Broker"
                            className="text-xs"
                        >
                            Use Own Broker
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div >

        </>
    )
}

export const UploadInvoice = ({ props }) => {
    return (
        <>

            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <div className="w-[100px] h-9 px-1 py-2 bg-zinc-400 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                    <div className="text-white text-xs leading-tight">Invoice</div>
                </div>
                <Input
                    className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                    type="file"
                    id="myFile"
                    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                    placeholder="My File"
                />
            </div >
        </>
    )
}

export const SelectWarehouse = ({ props }) => {
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <Select className="flex flex-row gap-0 items-center">
                    <div className="w-[100px] h-9 px-1 py-2 bg-blue-900 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                        <div className="text-white text-xs leading-tight">Warehouse</div>
                    </div>
                    <SelectTrigger className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400">
                        <SelectValue placeholder="WR Toronto" />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                        <SelectItem
                            className="text-xs"
                            value="Shiplink Broker"
                        >
                            CAD Warehouse
                        </SelectItem>
                        <SelectItem
                            value="Own Broker"
                            className="text-xs"
                        >
                            USA Warehouse
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div >

        </>
    )
}

export const PARSInput = ({ props }) => {
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <div className="w-[100px] h-9 px-1 py-2 bg-neutral-900 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                    <div className="text-white text-xs leading-tight">PARS/PAPS</div>
                </div>
                <Input
                    className="w-[100px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                    type="number"
                    placeholder="12313131231"
                />
            </div >
        </>
    )
}

export const EntryNumber = ({ props }) => {
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <div className="w-[100px] h-9 px-1 py-2 bg-blue-900 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                    <div className="text-white text-xs leading-tight">Entry Number</div>
                </div>
                <Input
                    className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                    type="number"
                    placeholder="12313131231"
                />
            </div >
        </>
    )
}