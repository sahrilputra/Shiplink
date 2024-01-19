"use client"
import Image from 'next/image'
import { React, useState } from 'react'
import { CrossBorder, CrossBorderTable } from './CrossBorder';
// import { Checkbox, Button } from 'flowbite-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDownIcon } from '@/components/icons/iconCollection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ItemsPackage({ onClickButton }) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    const toggleClicked = (op) => {
        setIsExpanded(op)
    }
    const [clicked, setIsClicked] = useState(false);


    // button Control 
    const [selectedButton, setSelectedButton] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        onClickButton(buttonName);
        setButtonEnabled(false); // Disable other buttons when one is clicked
    };

    return (
        <div
            onClick={() => { toggleClicked(true) }}
            className={`
            container  w-full px-5 py-2.5 bg-white rounded-md shadow-md border border-zinc-600 border-opacity-50 hover:bg-gray-300/10 cursor-pointer
            ${isExpanded ? 'hover:bg-white cursor-auto' : ''}
            `}
        >
            <div className="flex flex-row justify-between items-center gap-5 relative">
                <div className="justify-start items-center gap-[15px] flex">
                    <div className="w-[50px] h-[50px] p-2.5 bg-blue-900 rounded-md justify-center items-center gap-2.5 flex">
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
                        <div className="text-black text-sm font-semiBold">#5635-342808</div>
                        <div className="text-sky-700 text-sm font-semiBold">Shipping Mailbox</div>
                        <div className="justify-start items-start gap-[9px] inline-flex">
                            <div className="text-zinc-600 text-sm font-semiBold">Express</div>
                            <div className="justify-start items-center gap-2.5 flex">
                                <div className="text-red-700 text-opacity-80 text-sm font-bold">872812138328</div>
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
                        <div><span className=" w-[150px] text-zinc-600 text-[13px] font-b">Shipped</span><span className="text-zinc-600 text-[13px] font-normal">, 12 jun, 2023</span></div>
                    </div>
                </div>

                <div className="rightItems flex flex-col gap-1 w-2/3 justify-end relative">
                    <div className="flex flex-row justify-end align-middle items-center gap-5 relative right-0 ">
                        <div className="h-[23px] px-2.5 py-[5px] bg-blue-200 rounded border border-blue-500 justify-center items-center gap-2.5 flex">
                            <div className="text-center text-blue-500 text-xs ">Received</div>
                        </div>
                        <div className="w-[30px]">
                            <Checkbox />
                        </div>
                    </div>

                    <div className="flex flex-row justify-end items-center gap-5 relative right-0">
                        <div className="h-[23px] justify-end items-center gap-2.5 flex">
                            <div className="text-right text-zinc-600 text-sm ">Boston, USA</div>
                        </div>
                        {/* <div className=""> <ArrowDownIcon /></div> */}
                        <div className="w-[30px]">
                            {/* <button aria-label="arrow" size='small' className={` ${isExpanded ? 'rotate-180' : ''}`} onClick={toggleExpanded}>
                             */}
                            <button aria-label="arrow" size='small' className={` ${isExpanded ? 'rotate-180' : ''}`} onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
                                <ArrowDownIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isExpanded ? (
                <div className="expanded">
                    <div className="flex flex-row justify-between items-center gap-5 relative">
                        <div className="justify-start items-center gap-[15px] flex">
                            <div className="p-2.5 bg-red-700 rounded justify-center items-center gap-2.5 flex">
                                <button className="w-[25px] h-[25px] relative">
                                    <Image
                                        src={"/icon/details.svg"}
                                        width={25}
                                        height={25}
                                        alt='details icon'
                                        className='w-[25px] h-[25px] left-0 top-0 absolute'
                                    />
                                </button>
                            </div>
                            <div className="flex-col justify-start items-start gap-px inline-flex">
                                <div className="text-black text-xs font-semiBold ">Name Or Something</div>
                                <div className="text-zinc-600 text-xs ">12mm x 10mm</div>
                                <div className="text-zinc-600 text-xs ">1 kg</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="justify-between items-start inline-flex ">
                                <div className="text-zinc-900 text-sm font-semiBold ">Confirm Your Order</div>
                            </div>
                            <div className="justify-start items-start gap-2.5 inline-flex flex-wrap">
                                <Button
                                    variant={`${selectedButton === "Hold Pickup" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                    className="w-[150px] h-[37px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                    onClick={() => handleButtonClick("Hold Pickup")}
                                >
                                    <div className="text-justify text-white text-xs font-semiBold ">Hold for Pickup</div>
                                </Button>
                                <Button
                                    variant={`${selectedButton === "Cross Border Pickup" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                    className="w-[150px] h-[37px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                    onClick={() => handleButtonClick("Cross Border Pickup")}
                                >
                                    <div className="text-justify text-white text-xs font-semiBold ">Cross Border Pickup</div>
                                </Button>
                                <Button
                                    variant={`${selectedButton === "Forward Package" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                    className="w-[150px] h-[37px]  justify-center items-center gap-2.5 flex"
                                    onClick={() => handleButtonClick("Forward Package")}
                                >
                                    <div className="text-justify text-white text-xs font-semiBold ">Forward Package</div>
                                </Button>
                                <Button
                                    variant={`${selectedButton === "Cross Border Forward" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                    className="w-[150px] h-[37px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                    onClick={() => handleButtonClick("Cross Border Forward")}
                                >
                                    <div className="text-justify text-white text-xs font-semiBold ">Cross Border Forward</div>
                                </Button>
                            </div>
                            <div className="w-[100%]">
                                <Separator className="py-[1.5px]" />
                            </div>
                        </div>
                    </div>


                    {/* Cross Border */}
                    <div className="w-[100%] flex justify-center align-middle mx-auto ">
                        {
                            selectedButton === "Cross Border Forward" ? (
                                <CrossBorderTable />
                            ) : (
                                <>
                                </>
                            )
                        }

                    </div>
                </div>

            ) : (
                <></>
            )}
        </div>
    )
}
