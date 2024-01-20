"use client"
import Image from 'next/image'
import { React, useState } from 'react'
import { CrossBorder, CrossBorderTable } from './CrossBorder';
// import { Checkbox, Button } from 'flowbite-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDownIcon } from '@/components/icons/iconCollection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PackageType } from '@/components/PackageItemsUI/PackageType';
import { DetailsIcons } from '@/components/icons/iconCollection';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { Details } from '../DialogDetails/Details';
import { PackageStatus } from '@/components/PackageItemsUI/PackageStatus';
import { PackageIndicator } from '@/components/PackageItemsUI/PackageIndicator';
import { CopyIcons } from '@/components/icons/iconCollection';
import { useToast } from '@/components/ui/use-toast';
export default function ItemsPackage({ onClickButton, item }) {
    const { toast } = useToast();

    const {
        id,
        orderType,
        shippingId,
        shippingType,
        carrierType,
        carrierTrackingNumber,
        from,
        to,
        variant,
        dimension,
        weight,
        status,
        date,
        time,
        isShipped,
    } = item.package;


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

                    <PackageType variant={variant} notif={"notif"} />
                    <div className="flex-col justify-start items-start inline-flex">
                        <div className="text-black text-sm font-semiBold">{shippingId}</div>
                        <div className="text-sky-700 text-sm font-semiBold">Shipping Mailbox</div>
                        <div className="justify-start items-start inline-flex">
                            <div className="justify-start items-center gap-2.5 flex">
                                <div className="text-zinc-600 text-sm font-semiBold">{shippingType}</div>
                                <p className='text-red-700 text-opacity-80 text-sm font-bold'>{carrierTrackingNumber}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-1 h-100% flex items-end justify-center flex-col">
                    <Button
                        variant="ghost"
                        className="w-[30px] h-[30px]"
                        size="icon"
                        onClick={() => {
                            toast({
                                title: "Copied!",
                                description: "Your tracking number has been copied to your clipboard.",
                            })
                        }}
                    >
                        <CopyIcons width={15} height={15} />
                    </Button>

                </div>
                <div className=" w-2/3 justify-start items-center gap-[10px] flex">
                    <div className="w-[36.14px] h-[50px]">
                        <Separator orientation="vertical" className="px-[1px] h-[100%] bg-zinc-600/50 " />
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <div className="w-[36.14px] h-[23.55px] relative">
                            {
                                from === "USA" ? (
                                    <>
                                        <Image
                                            src={"/assets/country/USA-flag.png"}
                                            width={66}
                                            height={70}
                                            className='left-[-10.19px] top-[-23.55px]'
                                            alt='USA icon'
                                        />
                                    </>
                                ) : from === "Canada" ? (
                                    <>
                                        <Image
                                            src={"/assets/country/cad-flag.png"}
                                            width={66}
                                            height={70}
                                            className='left-[-10.19px] top-[-23.55px]'
                                            alt='USA icon'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src={"/assets/country/USA-flag.png"}
                                            width={66}
                                            height={70}
                                            className='left-[-10.19px] top-[-23.55px]'
                                            alt='USA icon'
                                        />
                                    </>
                                )
                            }
                        </div>
                        <div className="flex-col w-full justify-start items-start gap-[5px] inline-flex">
                            <PackageIndicator status={status} />
                            <div><span className=" w-[150px] text-zinc-600 text-[13px] font-b">Shipped</span><span className="text-zinc-600 text-[13px] font-normal">, {date}</span></div>
                        </div>
                    </div>
                </div>

                <div className="rightItems gap-5 flex flex-row  w-2/3 justify-end relative">
                    <div className="flex flex-col justify-end items-end ">
                        <PackageStatus variant={status} />
                        <div className="h-[30px] justify-end items-center gap-2.5 flex">
                            <div className="text-right text-zinc-600 text-sm ">{to}</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end items-center ">
                        <div className="">
                            <Checkbox />
                        </div>
                        <div className="w-[30px] h-[30px]">
                            {/* <button aria-label="arrow" size='small' className={` ${isExpanded ? 'rotate-180' : ''}`} onClick={toggleExpanded}>
                             */}
                            <Button
                                aria-label="arrow"
                                variant="ghost"
                                size='small'
                                className={` w-[30px] h-[30px] ${isExpanded ? 'rotate-180' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}
                            >
                                <ArrowDownIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {isExpanded ? (
                <div className="expanded">
                    <div className="flex flex-row justify-between items-center gap-5 relative">
                        <div className="justify-start items-center gap-[15px] flex">
                            <Button
                                className="relative w-[40px] h-[40px] p-3 px-[5px] flex justify-center items-center"
                                variant="destructive"

                            >
                                <div className="w-[40px] h-[40px] p-3 relative">
                                    <DetailsIcons width={30} height={30} className="w-[40px] h-[40px] px-2 absolute top-0 left-[-5px]" />
                                </div>
                            </Button>

                            <div className="flex-col justify-start items-start gap-px inline-flex">
                                <div className="text-black text-xs font-semiBold ">Name Or Something</div>
                                <div className="text-zinc-600 text-xs ">{dimension}</div>
                                <div className="text-zinc-600 text-xs ">{weight}</div>
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
