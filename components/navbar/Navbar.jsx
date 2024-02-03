'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { ShippingLabelIcon, ShippingCalculatorIcon } from '../icons/navbarIcons'
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
export const Navbar = () => {

    const [loading, setLoading] = useState(true);

    // Contoh penggunaan useEffect untuk mensimulasikan proses loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/*  */}
            <nav className="w-[100%] h-[68px] left-0 top-0 bg-white flex flex-row justify-between items-center fixed z-[10] border-b-2 border-[#ECEDEE]" >
                <div className="">
                    {/* <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleSidebar}
                    >
                        <GridIcons width={15} height={15} />
                    </Button> */}
                </div>
                <div className="w-[100%] justify-end items-center gap-3 flex py-3 px-10">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Ship</NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-10 flex justify-between `}>
                                            <p>Shipping Labels</p>
                                            <ShippingLabelIcon width={20} height={20} />
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-3 flex justify-between `}>
                                            <p>Shipping Calculator</p>
                                            <ShippingCalculatorIcon width={20} height={20} />
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Track</NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-3 `}>
                                            <p>Track My Package</p>
                                            <ShippingLabelIcon width={20} height={20} />
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-9`}>
                                            <p>Delivery Status</p>
                                            <ShippingLabelIcon width={20} height={20} />
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <div className="w-[100%] ">
                                        <Link href="/#" legacyBehavior passHref
                                            className='w-full justify-start flex '>
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-[100%] gap-3 flex justify-between`}>
                                                <div className="flex flex-row justify-between gap-2 w-[150px]">
                                                    <p>Create Tickets</p>
                                                    <ShippingLabelIcon width={20} height={20} />
                                                </div>
                                            </NavigationMenuLink>
                                        </Link>
                                        <Link href="/#" legacyBehavior passHref
                                            className='w-[100%] justify-start flex '>
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-[100%] gap-3 flex justify-between`}>
                                                <div className="flex flex-row justify-between gap-2 w-[150px]">
                                                    <p>Contact Us</p>
                                                    <ShippingLabelIcon width={20} height={20} />
                                                </div>
                                            </NavigationMenuLink>
                                        </Link>
                                        <Link href="/#" legacyBehavior passHref
                                            className='w-full justify-start flex'>
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full flex justify-between`}>
                                                <div className="flex flex-row justify-between gap-2 w-[150px]">
                                                    <p>FAQ</p>
                                                    <ShippingLabelIcon width={20} height={20} />
                                                </div>
                                            </NavigationMenuLink>
                                        </Link>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <div className="justify-start items-center gap-3 flex">
                                        <Image
                                            src={"/assets/country/uk-flag.png"}
                                            width={20}
                                            height={20}
                                            alt="uk-flag"
                                        />
                                        <div className="text-black text-sm font-semibold font-['Poppins']">Eng</div>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-3 `}>
                                            <div className="flex flex-row justify-between gap-2 w-[100px]">
                                                <div className="w-[20px] h-[20px] rounded-full">
                                                    <img
                                                        src={`https://flagcdn.com/fr.svg`}
                                                        alt=""
                                                        className='object-cover rounded-full w-[20px] h-[20px]'
                                                    />
                                                </div>
                                                <p>English</p>
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-9`}>
                                            <div className="flex flex-row justify-between gap-2 w-[100px]">
                                                <div className="w-[20px] h-[20px] rounded-full">
                                                    <img
                                                        src={`https://flagcdn.com/es.svg`}
                                                        alt=""
                                                        className='object-cover rounded-full w-[20px] h-[20px]'
                                                    />
                                                </div>
                                                <p>Spanyol</p>
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>


                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <div className="justify-start items-center gap-3 flex p-2">
                                        {loading ? (
                                            <Skeleton className="w-[35px] h-[35px] rounded-full" />
                                        ) : (
                                            <img
                                                src="https://source.boringavatars.com/beam"
                                                className='rounded-full w-[35px] h-[35px]'
                                                alt="user image"
                                            />
                                        )}
                                        <div className="flex flex-col justify-start text-left">
                                            {loading ? (
                                                <>
                                                    <Skeleton className="h-4 w-[100px]" />
                                                    <Skeleton className="h-3 w-[50px]" />
                                                </>
                                            ) : (
                                                <>
                                                    <div className=" text-black text-sm font-semiBold">User, </div>
                                                    <div className=" text-black text-sm font-normal ">Premium</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-3 `}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Account Setting</p>
                                                <ShippingLabelIcon width={20} height={20} />
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-9`}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Membership Plan</p>
                                                <ShippingLabelIcon width={20} height={20} />
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-9`}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Logout</p>
                                                <ShippingLabelIcon width={20} height={20} />
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                </div>
            </nav>
        </>
    )
}

