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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { ShippingLabelIcon, ShippingCalculatorIcon } from '../icons/navbarIcons'
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { ChevronDown, LogOut, LogOutIcon, Settings } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/button'
export const Navbar = () => {

    const [openShip, setOpenShip] = useState(false);
    const [openSupport, setOpenSupport] = useState(false);
    const [openTrack, setOpenTrack] = useState(false);
    const [openLang, setOpenLang] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
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
        signOut({
            redirect: true,
            callbackUrl: '/auth/login'
        })
    }

    console.log("IMAGES : ", session?.user?.img)

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
                    <DropdownMenu modal={false} open={openShip} onOpenChange={setOpenShip}>
                        <DropdownMenuTrigger asChild >

                            <Button
                                id="btn"
                                variant="ghost"
                                className="flex flex-row gap-2 items-center"
                            >
                                <p>Ship</p>
                                <ChevronDown
                                    size={14}
                                    className={`transform ${openShip ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal forceMount>
                            <DropdownMenuContent className="border border-gray-200" >
                                <Link href="/shipping-lebels/new-labels" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                        <p>Shipping Labels</p>
                                        <ShippingLabelIcon width={20} height={20} />
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/shipping-lebels/new-labels" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                        <p>Shipping Calculator</p>
                                        <ShippingCalculatorIcon width={20} height={20} />
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>

                    <DropdownMenu modal={false} open={openTrack} onOpenChange={setOpenTrack}>
                        <DropdownMenuTrigger asChild >
                            <Button
                                id="btn"
                                variant="ghost"
                                className="flex flex-row gap-2 items-center"
                            >
                                <p>Track</p>
                                <ChevronDown
                                    size={14}
                                    className={`transform ${openTrack ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal forceMount>
                            <DropdownMenuContent className="border border-gray-200" >
                                <Link href="/shipping-lebels/new-labels" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                        <p>Track My Package</p>
                                        <ShippingLabelIcon width={20} height={20} />
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/shipping-lebels/new-labels" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                        <p>Delivery Status</p>
                                        <ShippingLabelIcon width={20} height={20} />
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>


                    <DropdownMenu modal={false} open={openSupport} onOpenChange={setOpenSupport}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                id="btn"
                                variant="ghost"
                                className="flex flex-row gap-2 items-center"
                            >
                                <p>Support</p>
                                <ChevronDown
                                    size={14}
                                    className={`transform ${openSupport ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal forceMount>
                            <DropdownMenuContent className="border border-gray-200" >
                                <Link href="/shipping-lebels/new-labels" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                        <p>Create Tickets</p>
                                        <ShippingLabelIcon width={20} height={20} />
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                    <p>Contact Us</p>
                                    <ShippingLabelIcon width={20} height={20} />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex justify-between flex-row gap-3 cursor-pointer">
                                    <p>FAQ</p>
                                    <ShippingLabelIcon width={20} height={20} />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>

                    <DropdownMenu modal={false} open={openLang} onOpenChange={setOpenLang}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex flex-row gap-2 items-center">
                                <div className="text-black text-sm font-semibold font-['Poppins']">Eng</div>
                                <ChevronDown
                                    size={14}
                                    className={`transform ${openLang ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal forceMount>
                            <DropdownMenuContent className="border border-gray-200" >
                                <DropdownMenuItem className="flex justify-between flex-col">
                                    <p>English</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex justify-between flex-col">
                                    <p>Français</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex justify-between flex-col">
                                    <p>Español</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>

                    <DropdownMenu modal={false} open={openProfile} onOpenChange={setOpenProfile}>
                        <DropdownMenuTrigger asChild className='flex flex-row items-start justify-start'>
                            <Button
                                variant="ghost"
                                className="flex flex-row gap-2 items-center justify-start"
                            >
                                <div className="justify-start items-center gap-3 flex p-2">
                                    {loading ? (
                                        <Skeleton className="w-[35px] h-[35px] rounded-full" />
                                    ) : (
                                        session?.user?.img === "null" || session?.user?.img === undefined || session?.user?.img === null || session?.user?.img === "" ? (
                                            <Image
                                                src={"/assets/user-holder.svg"}
                                                width={20}
                                                height={20}
                                                alt="user image"
                                                className='object-cover rounded-full w-[20px] h-[20px]'
                                                style={{ borderRadius: "50%", width: "35px", height: "35px" }}
                                            />
                                        ) : (
                                            <img
                                                src={customerImage}
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
                                                <div className=" text-black text-sm font-semiBold">
                                                    {session ? firstName : "User"}
                                                </div>
                                                <div className=" text-black text-xs font-normal ">{session ? session.user.type : "Type"}</div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <ChevronDown
                                    size={14}
                                    className={`transform ${openProfile ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal forceMount>
                            <DropdownMenuContent className="border border-gray-200" >
                                <Link href="/account" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-col cursor-pointer" >
                                        <div className="flex flex-row justify-between gap-2 w-[170px]">
                                            <p>Account Setting</p>
                                            <Settings width={20} height={20} />
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/membership" passHref>
                                    <DropdownMenuItem className="flex justify-between flex-col cursor-pointer" >
                                        <div className="flex flex-row justify-between gap-2 w-[170px]">
                                            <p>Membership Plan</p>
                                            <ShippingLabelIcon width={20} height={20} />
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    onClick={() => handleSingOut()}
                                    className="flex justify-between flex-col cursor-pointer"
                                >
                                    <div>
                                        <div
                                            className="flex flex-row justify-between gap-2 w-[170px]"
                                        >
                                            <p>Logout</p>
                                            <LogOut width={20} height={20} />
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>

                    {/* 
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
                    </NavigationMenu> */}

                </div>
            </nav>
        </>
    )
}

