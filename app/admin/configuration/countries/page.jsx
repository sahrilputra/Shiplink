import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon, OptionIcons, FilterIcons } from '@/components/icons/iconCollection'
import { Status } from '@/components/status/Status';
import { SearchBar } from '@/components/ui/searchBar';
import { Button } from '@/components/ui/button';
export default function countries() {

    const allDummyData = [
        {
            country: 'United States',
            'Country Code': 'AFG',
            Numberic: '004',
            Status: 'Active',
        },
        {
            country: 'Canada',
            'Country Code': 'CAN',
            Numberic: '124',
            Status: 'Active',
        },
        {
            country: 'United Kingdom',
            'Country Code': 'GBR',
            Numberic: '826',
            Status: 'Disable',
        },
        {
            country: 'Australia',
            'Country Code': 'AUS',
            Numberic: '036',
            Status: 'Active',
        },
    ];

    return (
        <>

            <div className="container w-full mx-auto">
                <div className={`flex flex-row justify-between items-center w-[100%]`}>
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <SearchBar />
                        <Button
                            variant="filter"
                            size="icon"
                            className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                            <FilterIcons fill="#CC0019" />
                        </Button>
                    </div>
                    <Button
                        variant="secondary"
                        className="">
                        <div className="text-white text-sm font-medium ">Add New Countries</div>
                    </Button>
                </div>

                <table className="w-full mt-4 ">
                    <thead className='h-[57px] px-[25px] py-[18px] bg-blue-100 rounded rounded-tl rounded-tr border border-neutral-200 justify-start items-center gap-[15px] text-left'>
                        <tr className='text-zinc-600 text-sm font-normal'>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Country</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Country Code</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Numeric</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Status</th>
                            <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='px-[25px] py-[18px]'>
                        {allDummyData.map((data, index) => (
                            <tr
                                className=' px-[25px] py-[18px] bg-white border border-neutral-200 justify-start text-zinc-500 text-sm font-normal'
                                key={index} >
                                <td className='px-[25px] py-[18px] ' >{data.country}</td>
                                <td className='px-[25px] py-[18px] '>{data['Country Code']}</td>
                                <td className='px-[25px] py-[18px] '>{data.Numberic}</td>
                                <td className='px-[25px] py-[18px] '>
                                    <Status status={data.Status} />
                                </td>
                                <td className='px-[25px] py-[18px]'>
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