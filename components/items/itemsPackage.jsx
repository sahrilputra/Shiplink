"use client"
import Image from 'next/image'
import { React, useState } from 'react'
import { ArrowDownIcon } from '../icons/iconCollection'
// import { Checkbox } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CrossBorder } from './CrossBorder';


export default function ItemsPackage() {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }


    return (

        <div className="container  w-full px-5 py-2.5 bg-white rounded-md shadow-md border border-zinc-600 border-opacity-50 ">
            <div className="flex flex-row justify-between items-center gap-5 relative">
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
                        <div className="border-l h-10 border-gray-600"></div>
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

                <div className="rightItems flex flex-col gap-1 w-2/3 justify-end relative">
                    <div className="flex flex-row justify-end align-middle items-center gap-5 relative right-0 ">
                        <div className="h-[23px] px-2.5 py-[5px] bg-blue-200 rounded border border-blue-500 justify-center items-center gap-2.5 flex">
                            <div className="text-center text-blue-500 text-xs font-medium font-['Poppins']">Received</div>
                        </div>
                        {/* <input type="checkbox" /> */}
                        {/* <FormControlLabel control={<Checkbox defaultChecked size='small' />} /> */}
                        <Checkbox defaultChecked size='small' className='w-[30px]' />
                    </div>

                    <div className="flex flex-row justify-end items-center gap-5 relative right-0">
                        <div className="h-[23px] justify-end items-center gap-2.5 flex">
                            <div className="text-right text-zinc-600 text-sm font-medium font-['Poppins']">Boston, USA</div>
                        </div>
                        {/* <div className=""> <ArrowDownIcon /></div> */}
                        <IconButton aria-label="arrow" size='small' className={`w-[30px] ${isExpanded ? 'rotate-180' : ''}`} onClick={toggleExpanded}>
                            <ArrowDownIcon />
                        </IconButton>
                    </div>
                </div>
            </div>

            {isExpanded ? (
                <div className="expanded">
                    <div className="flex flex-row justify-between items-center gap-5 relative">
                        <div className="justify-start items-center gap-[15px] flex">
                            <div className="p-2.5 bg-red-700 rounded justify-center items-center gap-2.5 flex">
                                <div className="w-[25px] h-[25px] relative">
                                    {/* <img className="w-[25px] h-[25px] left-0 top-0 absolute" src="https://via.placeholder.com/25x25" /> */}
                                    <Image
                                        src={"/icon/details.svg"}
                                        width={25}
                                        height={25}
                                        alt='details icon'
                                        className='w-[25px] h-[25px] left-0 top-0 absolute'
                                    />
                                    {/* <div className="w-[39.06px] h-[44.53px] left-[-7.03px] top-[-9.38px] absolute bg-white" /> */}
                                </div>
                            </div>
                            <div className="flex-col justify-start items-start gap-px inline-flex">
                                <div className="text-black text-xs font-medium font-['Poppins']">Name Or Something</div>
                                <div className="text-zinc-600 text-xs font-normal font-['Poppins']">12mm x 10mm</div>
                                <div className="text-zinc-600 text-xs font-normal font-['Poppins']">1 kg</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="w-[470px] justify-between items-start inline-flex ">
                                <div className="text-zinc-900 text-sm font-medium font-['Poppins']">Confirm Your Order</div>
                            </div>
                            <div className="justify-start items-start gap-2.5 inline-flex">
                                <button className="w-[150px] h-[37px] px-3 py-[5px] bg-red-700 rounded justify-center items-center gap-2.5 flex">
                                    <div className="text-justify text-white text-xs font-semibold font-['Poppins']">Hold for Pickup</div>
                                </button>
                                <button className="w-[150px] h-[37px] px-3 py-[5px] bg-red-700 rounded justify-center items-center gap-2.5 flex">
                                    <div className="text-justify text-white text-xs font-semibold font-['Poppins']">Cross Border Pickup</div>
                                </button>
                                <button className="w-[150px] h-[37px] px-3 py-[5px] bg-red-700 rounded justify-center items-center gap-2.5 flex">
                                    <div className="text-justify text-white text-xs font-semibold font-['Poppins']">Forward Package</div>
                                </button>
                                <button className=" h-[37px] px-3 py-[5px] bg-red-700 rounded justify-center items-center gap-2.5 flex">
                                    <div className="text-justify text-white text-xs font-semibold font-['Poppins']">Cross Border Forward</div>
                                </button>
                            </div>
                            <div className="h-[0px] flex-col justify-start items-start gap-2.5 flex">
                                <div className="min-w-[471px] max-w-screen-sm h-[0px] border-2 border-neutral-200"></div>
                            </div>
                        </div>
                    </div>




                    {/* Cross Border */}
                    {/* <CrossBorder /> */}
                </div>


            ) : (
                <></>
            )}
        </div>
    )
}
