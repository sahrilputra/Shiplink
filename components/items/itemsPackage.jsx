import Image from 'next/image'
import React from 'react'
import { ArrowDownIcon } from '../icons/iconCollection'
// import { Checkbox } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
export default function ItemsPackage() {
    return (
        <div className=" w-full px-5 py-2.5 bg-white rounded-md shadow-md border border-zinc-600 border-opacity-50 
        flex flex-row justify-between items-center gap-5 relative
        ">
            <div className="justify-start items-center gap-[15px] flex">
                <div className="w-[50px] h-[50px] p-2.5 bg-secondary rounded-md justify-center items-center gap-2.5 flex">
                    <div className="w-[25px] h-[25px] relative">
                        <Image
                            src={"/assets/mailbox.svg"}
                            width={25}
                            height={25}
                            alt='mailbox icon'
                        />
                    </div>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-black text-sm font-medium font-['Poppins']">#5635-342808</div>
                    <div className="text-sky-700 text-sm font-medium font-['Poppins']">Shipping Mailbox</div>
                    <div className="justify-start items-start gap-[9px] inline-flex">
                        <div className="text-zinc-600 text-sm font-medium font-['Poppins']">Express</div>
                        <div className="justify-start items-center gap-2.5 flex">
                            <div className="text-red-700 text-opacity-80 text-sm font-semibold font-['Poppins']">872812138328</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-2/3 justify-start items-start gap-[11px] flex">
                <div className="w-[36.14px] h-[23.55px] relative">
                    <div className="border-l h-10 border-gray-700"></div>
                </div>
                <div className="w-[36.14px] h-[23.55px] relative">
                    <Image
                        src={"/assets/USA.svg"}
                        width={66}
                        height={70}
                        className='left-[-10.19px] top-[-23.55px]'
                        alt='USA icon'
                    />
                </div>
                <div className="flex-col w-full justify-start items-start gap-[5px] inline-flex">
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-[63px]" />
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-[63px]" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-[63px]" />
                    </div>
                    <div><span className=" w-[150px] text-zinc-600 text-[13px] font-medium font-['Poppins']">Shipped</span><span className="text-zinc-600 text-[13px] font-normal font-['Poppins']">, 12 jun, 2023</span></div>
                </div>
            </div>

            <div className="rightItems flex flex-col gap-1 w-2/3 justify-end relative right-[30px]">

                <div className="flex flex-row justify-end align-middle items-center gap-5 relative right-0 ">
                    <div className="h-[23px] px-2.5 py-[5px] bg-blue-200 rounded border border-blue-500 justify-center items-center gap-2.5 flex">
                        <div className="text-center text-blue-500 text-xs font-medium font-['Poppins']">Received</div>
                    </div>
                    <input type="checkbox" />
                    {/* <FormControlLabel control={<Checkbox defaultChecked size='small' />} /> */}
                </div>

                <div className="flex flex-row justify-end items-center gap-5 relative right-0">
                    <div className="h-[23px] justify-end items-center gap-2.5 flex">
                        <div className="text-right text-zinc-600 text-sm font-medium font-['Poppins']">Boston, USA</div>
                    </div>
                    <div className=""> <ArrowDownIcon /></div>
                </div>

            </div>
        </div>
    )
}
