/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '../ui/dropdown-menu'
import { ShippingLabelIcon, ShippingCalculatorIcon } from '../icons/navbarIcons'
import { Button } from '../ui/button'
export const Navbar = () => {
    return (
        <>
            {/*  */}
            <div className="w-full h-[68px] left-0 top-0 bg-white" >
                <div className="justify-end items-center gap-3 flex py-3 px-10">
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start items-center gap-3 flex">
                                <p className="text-black text-sm font-normal">Ship</p>
                                <div className="relative" >
                                    <Image
                                        src={"/icon/blackArrowIcon.svg"}
                                        width={10}
                                        height={10}
                                        alt="arrow icon"
                                    />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Labels</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Calculator</p>
                                <ShippingCalculatorIcon width={15} height={15} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start items-center gap-3 flex">
                                <p className="text-black text-sm font-normal">Track</p>
                                <div className="relative" >
                                    <Image
                                        src={"/icon/blackArrowIcon.svg"}
                                        width={10}
                                        height={10}
                                        alt="arrow icon"
                                    />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Labels</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Calculator</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start items-center gap-3 flex">
                                <p className="text-black text-sm font-normal">Support</p>
                                <div className="relative" >
                                    <Image
                                        src={"/icon/blackArrowIcon.svg"}
                                        width={10}
                                        height={10}
                                        alt="arrow icon"
                                    />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Labels</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Calculator</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start items-center gap-3 flex">
                                <Image
                                    src={"/assets/country/uk-flag.png"}
                                    width={20}
                                    height={20}
                                    alt="uk-flag"
                                />
                                <div className="text-black text-sm font-semibold font-['Poppins']">Eng</div>
                                <div className="relative" >
                                    <Image
                                        src={"/icon/blackArrowIcon.svg"}
                                        width={12}
                                        height={12}
                                        alt="arrow icon"
                                    />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Labels</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Calculator</p>
                                <ShippingCalculatorIcon width={15} height={15} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start items-center gap-3 flex p-2">
                                <img
                                    src="https://source.boringavatars.com/beam"
                                    className='rounded-full w-[35px] h-[35px]'
                                    alt="user image"
                                />
                                <div className="flex flex-col justify-start text-left">
                                    <div className=" text-black text-sm font-semiBold">User, </div>
                                    <div className=" text-black text-sm font-normal ">Premium</div>
                                </div>
                                <div className="justify-center items-center inline-flex" >
                                    <Image
                                        src={"/icon/blackArrowIcon.svg"}
                                        width={12}
                                        height={12}
                                        alt="arrow icon"
                                    />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Labels</p>
                                <ShippingLabelIcon width={15} height={15} />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-normal text-xs cursor-pointer flex flex-row justify-between gap-2">
                                <p>Shipping Calculator</p>
                                <ShippingCalculatorIcon width={15} height={15} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}

