import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon } from '@/components/icons/iconCollection'
import { CatergoryList } from './CatergoryList'
import { SearchBar } from '@/components/ui/searchBar'

export const ServicesCategory = () => {
    return (
        <>
            <div className="w-[300px] px-[15px] pt-5 pb-5 bg-white rounded border border-neutral-200 flex-col justify-start items-start inline-flex gap-[10px]">
                <div className="flex flex-col gap-2">
                    <p className='text-sm font-bold'>All Service Category</p>
                    <SearchBar className="w-full"/>
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
