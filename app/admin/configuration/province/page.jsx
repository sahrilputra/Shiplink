import { OptionIcons, SearchIcon, FilterIcons } from '@/components/icons/iconCollection';
import { SearchBar } from '@/components/ui/searchBar';
import { Button } from '@/components/ui/button';
import { TextInput } from 'flowbite-react';
import React from 'react'
export default function province() {


    const allDummyData = [
        {
            Country: 'Argentina',
            Code: 'ARG',
            State: 'Buenos Aires',
            Province: 'B',
        },
        {
            Country: 'Brazil',
            Code: 'BRA',
            State: 'Sao Paulo',
            Province: 'SP',
        },
        {
            Country: 'India',
            Code: 'IND',
            State: 'Maharashtra',
            Province: 'MH',
        },
        {
            Country: 'United Kingdom',
            Code: 'GBR',
            State: 'England',
            Province: 'ENG',
        },
        {
            Country: 'Australia',
            Code: 'AUS',
            State: 'New South Wales',
            Province: 'NSW',
        },
        {
            Country: 'Canada',
            Code: 'CAN',
            State: 'Ontario',
            Province: 'ON',
        },
    ];
    return (
        <>

            <div className="container w-full mx-auto">
                <div className={`flex flex-row justify-between items-center w-[100%]`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <FilterIcons fill="#CC0019" />
                            </Button>
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        className="">
                        <div className="text-white text-sm font-medium ">Add New Province</div>
                    </Button>
                </div>

                <table className="w-full mt-4 ">
                    <thead className='h-[57px] px-[25px] py-[18px] bg-blue-100 rounded rounded-tl rounded-tr border border-neutral-200 justify-start items-center gap-[15px] text-left'>
                        <tr className='text-zinc-600 text-sm font-normal'>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Country Code</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Country</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>State / Province</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Province Code</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='px-[25px] '>
                        {allDummyData.map((data, index) => (
                            <tr
                                className=' px-[25px] py-[10px] bg-white border border-neutral-200 justify-start text-zinc-500 text-sm font-normal'
                                key={index} >
                                <td className='px-[25px] py-[10px] ' >{data.Country}</td>
                                <td className='px-[25px] py-[10px] '>{data.Code}</td>
                                <td className='px-[25px] py-[10px] '>{data.State}</td>
                                <td className='px-[25px] py-[10px] '>{data.Province}</td>
                                <td className='px-[25px] py-[10px]'>
                                    <div className="">
                                        <div className=" justify-start items-start gap-[5px] inline-flex">
                                            <button className="px-[10px] py-[5px] bg-sky-50 rounded justify-center items-center gap-2.5 flex">
                                                <div className="text-sky-700 text-xs font-medium ">Edit</div>
                                            </button>
                                            <button className=" bg-sky-50 rounded py-[5px] px-[5px]">
                                                < OptionIcons
                                                    fill="#00509D"
                                                    width='15px'
                                                    height='15px'
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}