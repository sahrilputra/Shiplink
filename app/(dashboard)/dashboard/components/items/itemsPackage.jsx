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
import { DetailsModals } from '../DialogDetails/Details';
import { PackageStatus } from '@/components/PackageItemsUI/PackageStatus';
import { PackageIndicator } from '@/components/PackageItemsUI/PackageIndicator';
import { CopyIcons } from '@/components/icons/iconCollection';
import { useToast } from '@/components/ui/use-toast';
import { PaymentsDialog } from '../dashboardMenus/PaymentsV2/Payments';

export default function ItemsPackage({ onClickButton, item, onExpand, isExpand }) {
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

    // button Control 
    const [selectedButton, setSelectedButton] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [clicked, setIsClicked] = useState(false);


    const toggleExpanded = () => {
        onExpand(id); // Call onExpand to toggle expanded state in the parent component
        setIsExpanded(!isExpanded);
        onClickButton(null);
        if (isExpand === false) {
            setSelectedButton(null)
            setButtonEnabled(true);
         
        }
    };

    const toggleClicked = (op) => {
        onExpand(op)
        setIsExpanded(true)
    }



    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        onClickButton(buttonName);
        setButtonEnabled(false); // Disable other buttons when one is clicked
    };

    return (
        <div
            onClick={() => {
                if (!isExpand) {
                    toggleClicked(id)
                }
            }}
            className={`
            container  w-full px-5 py-2.5 bg-white rounded-md shadow-md border border-zinc-600 border-opacity-50 
            ${isExpand ? 'hover:bg-white cursor-default' : 'hover:bg-gray-300/10 cursor-pointer'}
            `}
        >
            <div className="flex flex-row justify-between items-center gap-5 relative">
                <div className="justify-start items-center gap-[15px] flex">

                    <PackageType variant={variant} notif={"notif"} />
                    <div className="flex-col justify-start items-start inline-flex w-[200px]">
                        <div className="text-black text-sm font-semiBold">{shippingId}</div>
                        <div className="text-sky-700 text-xs font-semiBold">Shipping Mailbox</div>
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
                            <div><span className=" w-[150px] text-zinc-600 text-[13px] font-b">Shipped</span><span className="text-zinc-600 text-xs font-normal">, {date}</span></div>
                        </div>
                    </div>
                </div>

                <div className="rightItems gap-5 flex flex-row  w-2/3 justify-end relative">
                    <div className="flex flex-col justify-end items-end ">
                        <PackageStatus variant={status} />
                        <div className="h-[30px]  justify-end items-center gap-2.5 flex">
                            <div className="text-right text-zinc-600 text-xs ">{to}</div>
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
                                className={`w-[30px] h-[30px] ${isExpand ? 'rotate-180' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleExpanded(); toggleExpanded(); }}
                            >
                                <ArrowDownIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            {
                isExpand ? (
                    <div className="expanded transition-transform ease-in-out ">
                        <div className="flex flex-row justify-between items-center gap-5 relative">
                            <div className="justify-start items-center gap-[15px] flex">
                                <DetailsModals />
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
                                {
                                    status === 'in transit' ? (
                                        <>
                                            <div className="justify-between items-center gap-5 flex rounded-sm flex-row flex-wrap border border-zinc-400/30 px-[10px] py-[10px] w-full">
                                                <div className="flex-row flex justify-start items-center gap-2 w-max pr-6 ">
                                                    <div className="w-[30px] h-[30px]">
                                                        <Image
                                                            src={'/assets/courrier/canadian.png'}
                                                            width={100}
                                                            height={100}
                                                            alt='canadian icon'
                                                        />
                                                    </div>
                                                    <p className='text-xs'>Canada Post Regular Parcel</p>
                                                </div>
                                                <div className=" w-max px-2 text-xs text-zinc-500 flex flex-col">
                                                    <p className='w-max'>Estimate 14-16 Apr</p>
                                                    <p className='w-max'>Tracking ID #1231231231</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="justify-start items-start gap-1 inline-flex flex-wrap">
                                                <PaymentsDialog variant="confirm" click={handleButtonClick} isSelectedButton={selectedButton} isButtonEnabled={buttonEnabled} />
                                                <Button
                                                    variant={`${selectedButton === "Cross Border Pickup" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                                    onClick={() => handleButtonClick("Cross Border Pickup")}
                                                    size="sm"
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Cross Border Pickup</div>
                                                </Button>
                                                <Button
                                                    variant={`${selectedButton === "Forward Package" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px]  justify-center items-center gap-2.5 flex"
                                                    size="sm"
                                                    onClick={() => handleButtonClick("Forward Package")}
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Forward Package</div>
                                                </Button>
                                                <Button
                                                    variant={`${selectedButton === "Cross Border Forward" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                                    size="sm"
                                                    onClick={() => handleButtonClick("Cross Border Forward")}
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Cross Border Forward</div>
                                                </Button>
                                            </div>
                                            <div className="w-[100%]">
                                                <Separator className="py-[1.5px]" />
                                            </div>
                                        </>
                                    )
                                }


                            </div>
                        </div>


                        <div className="w-[100%] flex justify-center align-middle mx-auto ">
                            {
                                selectedButton === "Cross Border Forward" ? (
                                    <CrossBorderTable />
                                ) : selectedButton === "Cross Border Pickup" ? (
                                    <>
                                        <CrossBorderTable />
                                    </>
                                ) : selectedButton === "Forward Package" ? (
                                    <>
                                        <CrossBorderTable />
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }

                        </div>
                    </div>

                ) : (
                    <></>
                )
            }


        </div >
    )
}
