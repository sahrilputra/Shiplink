import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon, OptionIcons } from '@/components/icons/iconCollection'
import { Status } from '@/components/status/Status'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { ServicesTabled } from './components/ServicesTabled'
export default function services() {

    return (
        <>
            <div className="header bg-white border w-[100%]  px-2 py-2.5 flex flex-col rounded-md ">
                <div className="tab">
                    <ServicesTabled />
                </div>
            </div>
        </>
    )
}