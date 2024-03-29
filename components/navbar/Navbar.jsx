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
import { LogOutIcon, Settings } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { useSession, signOut } from 'next-auth/react'
export const Navbar = () => {

    const [loading, setLoading] = useState(true);
    const { data: session } = useSession()

    // Contoh penggunaan useEffect untuk mensimulasikan proses loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSingOut = () => {
        signOut()
    }

    const fullName = session ? session.user.name : "";
    const firstName = fullName.split(" ")[0];
    const customerImage = `https://sla.webelectron.com/api/Users/getprofileimages?fullName=${session?.user?.img}`
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
                                <NavigationMenuTrigger
                                    
                                    onPointerEnter={(event) => event.preventDefault()}
                                    onPointerLeave={(event) => event.preventDefault()}
                                >
                                    Ship
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <Link href="/shipping-lebels/new-labels" legacyBehavior passHref>
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
                                <NavigationMenuTrigger
                                    onPointerEnter={(event) => event.preventDefault()}
                                    onPointerLeave={(event) => event.preventDefault()}
                                >
                                    Track
                                </NavigationMenuTrigger>
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
                                <NavigationMenuTrigger
                                    onPointerEnter={(event) => event.preventDefault()}
                                    onPointerLeave={(event) => event.preventDefault()}
                                >Support</NavigationMenuTrigger>
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
                                <NavigationMenuTrigger
                                    onPointerEnter={(event) => event.preventDefault()}
                                    onPointerLeave={(event) => event.preventDefault()}
                                >
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
                                <NavigationMenuTrigger
                                    onPointerEnter={(event) => event.preventDefault()}
                                    onPointerLeave={(event) => event.preventDefault()}
                                >
                                    <div className="justify-start items-center gap-3 flex p-2 w-[150px]">
                                        {loading ? (
                                            <Skeleton className="w-[35px] h-[35px] rounded-full" />
                                        ) : (
                                            session?.user?.img ? (
                                                <img
                                                    src={customerImage}
                                                    className='rounded-full w-[35px] h-[35px]'
                                                    alt="user image"
                                                />
                                            ) : (
                                                <img
                                                    src="https://source.boringavatars.com/beam"
                                                    className='rounded-full w-[35px] h-[35px]'
                                                    alt="user image"
                                                />
                                            )

                                        )}
                                        <div className="flex flex-col justify-start text-left">
                                            {loading ? (
                                                <>
                                                    <Skeleton className="h-4 w-[100px]" />
                                                    <Skeleton className="h-3 w-[50px]" />
                                                </>
                                            ) : (
                                                <>
                                                    <div className=" text-black text-sm font-semiBold">{firstName || ""}  </div>
                                                    <div className=" text-black text-xs font-normal ">{session ? session.user.type : ""}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <Link href="/account" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-3 `}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Account Setting</p>
                                                <Settings width={20} height={20} />
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/membership" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-9`}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Membership Plan</p>
                                                <ShippingLabelIcon width={20} height={20} />
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            onClick={() => handleSingOut()}
                                            className={`${navigationMenuTriggerStyle()} gap-9`}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Logout</p>
                                                <LogOutIcon width={20} height={20} />
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

