import React from 'react'
import { Input } from './input'
import { SearchIcon } from '../icons/iconCollection'
export const InputIcon = ({ props }) => {
    return (
        <div className="relative w-80">
            <Input type="text" placeholder="Search..." className="pr-12 pl-4" />
            <div className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 right-3"  >
                <SearchIcon
                    width={20}
                    height={20}
                />
            </div>
        </div>
    )
}
