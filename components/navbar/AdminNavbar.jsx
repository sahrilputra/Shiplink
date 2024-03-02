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
import { BellIcon, LogOut, Settings } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
export const AdminNavbars = () => {
    const { data: session } = useSession()
    const router = useRouter()
    console.log("session", session)
    const [loading, setLoading] = useState(true);

    const hanldeLogout = () => {
        signOut()
        router.push('/auth/admin')
    }
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
                                <NavigationMenuTrigger>
                                    <div className="flex flex-row gap-2 items-center">
                                        <BellIcon width={20} height={20} />
                                        <p>Notification</p>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col">
                                    <div className="notif flex flex-col gap-2 p-2">
                                        <p className='font-bold text-xs'>Logs</p>
                                        <div className="">
                                            <Separator className="h-[1px]" />
                                        </div>
                                        <Link href="/#" legacyBehavior passHref>
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-10 flex justify-between `}>
                                                <p>Nothing Happend</p>
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


                    <NavigationMenu
                        className="flex flex-row gap-3 items-center"
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <div className="justify-start items-center gap-3 flex p-2 w-[150px]">
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
                                                    <div className=" text-black text-sm font-semiBold">
                                                        {session ? session.user?.name : "User"}
                                                    </div>
                                                    <div className=" text-black text-sm font-normal ">{session ? session.user?.role : "role"}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex justify-between flex-col ">
                                    <Link href="/#" legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} gap-3 `}>
                                            <div className="flex flex-row justify-between gap-2 w-[170px]">
                                                <p>Account Setting</p>
                                                <Settings width={20} height={20} />
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                    <NavigationMenuLink
                                        onClick={() => hanldeLogout()}
                                        className={`${navigationMenuTriggerStyle()} gap-9`}>
                                        <div
                                            className="flex flex-row justify-between gap-2 w-[170px]"
                                        >
                                            <p>Logout</p>
                                            <LogOut width={20} height={20} />
                                        </div>
                                    </NavigationMenuLink>

                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                </div>
            </nav>
        </>
    )
}

