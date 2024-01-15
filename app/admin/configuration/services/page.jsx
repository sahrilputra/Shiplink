import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon, OptionIcons } from '@/components/icons/iconCollection'
import { Status } from '@/components/status/Status'
import { SearchBar } from '@/components/ui/searchBar'
export default function services() {

    return (
        <>
            <div className="header bg-white border w-[100%]  px-2 py-2.5 flex flex-col rounded-md ">
                <div className="justify-between items-center inline-flex w-[100%]">
                    <div className={`flex flex-row justify-between items-center w-[100%]`}>
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <SearchBar />
                        {/* <Button
                            variant="filter"
                            size="icon"
                            className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                            <FilterIcons fill="#CC0019" />
                        </Button> */}
                    </div>
                            {/* <div className="w-[39px] h-[35px] p-2 bg-white rounded border border-neutral-200 justify-center items-center gap-2.5 inline-flex" /> */}
                        </div>
                        <button className="w-[215px] h-10 px-8 bg-secondary rounded shadow justify-center items-center gap-2 inline-flex">
                            <div className="text-white text-sm font-medium font-['Poppins']">Services History</div>
                        </button>
                    </div>

                </div>


                <div className="tab">
                    <table className="w-full mt-4 ">
                        <thead className='h-[57px] px-[25px] py-[18px] bg-blue-100 rounded rounded-tl rounded-tr border border-neutral-200 justify-start items-center gap-[15px] text-left'>
                            <tr className='text-zinc-600 text-sm font-normal'>
                                <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Description</th>
                                <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Status</th>
                                <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Fee</th>
                                <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Last Change</th>
                                <th className='px-[25px] py-[18px] text-zinc-600 text-sm font-semibold'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='px-[25px] '>
                            <tr
                                className=' px-[25px] py-[10px] bg-white border border-neutral-200 justify-start text-zinc-500 text-sm font-normal'
                            >
                                <td className='px-[25px] py-[10px] min-w-[250px] ' >New Image Fees</td>
                                <td className='px-[25px] py-[18px] '>
                                    <Status status={'Active'} />
                                </td>
                                <td className='px-[25px] py-[10px] '>$ 30.00</td>
                                <td className='px-[25px] py-[10px] '>2023-11-30 03:45 PM</td>
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
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}