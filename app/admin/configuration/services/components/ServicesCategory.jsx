import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon } from '@/components/icons/iconCollection'
import { CatergoryList } from './CatergoryList'

export const ServicesCategory = () => {
    return (
        <>
            <div className="w-[full] px-[15px] pt-5 pb-8 bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-[201px] text-zinc-800 text-md font-semibold">All Service Category</div>
                <div className={`flex flex-row justify-between items-center w-[100%] mt-5`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <TextInput id="email4" type="text" rightIcon={SearchIcon} placeholder="Search..."
                            className='h-[25px] w-full bg-none text-zinc-500 text-xs font-normal outline-none border-zinc-500 focus:border-none focus:ring-0
                            items-center justify-center flex rounded-sm '
                        />
                    </div>
                </div>

                <div className="w-full border bg-white flex flex-col px-2 py-3 gap-3 rounded">
                    <CatergoryList Category={"Package"} isOpen={true} />
                    <CatergoryList Category={"Broker"} />
                    <CatergoryList Category={"Warehouse"} />
                    <CatergoryList Category={"Customer"} />
                </div>
            </div>
        </>
    )
}
