import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon } from '@/components/icons/iconCollection'
import { CatergoryList } from './CatergoryList'
import { SearchBar } from '@/components/ui/searchBar'

export const ServicesCategory = () => {
    return (
        <>
            <div className="w-[full] px-[15px] pt-5 pb-8 bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                <div className="w-[201px] text-zinc-800 text-md font-semibold">All Service Category</div>
                <div className={`flex flex-row justify-between items-center w-[100%] mt-5`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <SearchBar />
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
