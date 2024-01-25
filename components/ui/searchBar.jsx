import React from 'react'
import { Input } from './input'
import { SearchIcon } from '../icons/iconCollection'
export const SearchBar = () => {
    return (
        <div className="relative w-80">
            <Input type="text" placeholder="Search..." className="pr-8 pl-4 text-xs" />
            <div className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 right-3 text-xs"  >
                <SearchIcon
                    width={15}
                    height={15}
                />
            </div>
        </div>
    )
}

export const SearchPayments = () => {
    return (
        <div className="relative w-[100%]">
            <Input type="text" placeholder="Search..." className="pr-12 pl-4" text-sm />
            <div className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 right-3"  >
                <SearchIcon
                    width={20}
                    height={20}
                />
            </div>
        </div>
    )
}