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
import { ChevronDown } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/button'
export const AdminNavbars = () => {
    const { data: session } = useSession()
    const router = useRouter()
    console.log("session", session)
    const [loading, setLoading] = useState(true);

    const [userimg, setUserimg] = useState(session?.user?.img);
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

    console.log("NEW img", userimg)

    const fullName = session ? session.user.name : "";
    const firstName = fullName.split(" ")[0];
    const customerImage = `https://sla.webelectron.com/api/Users/getprofileimages?fullName=${session?.user?.img}`


    const [openNotification, setOpenNotification] = useState(false)
    console.log("🚀 ~ AdminNavbars ~ openNotification:", openNotification)
    const [openLanguage, setOpenLanguage] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
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
                    <DropdownMenu modal={false} onOpenChange={setOpenNotification} open={openNotification} >
                        <DropdownMenuTrigger >
                            <Button
                                id="btn"
                                variant="ghost"
                                className="flex flex-row gap-2 items-center"
                            >
                                <BellIcon width={18} height={18} />
                                <p>Notification</p>
                                <ChevronDown
                                    size={14}
                                    className={`transform ${openNotification ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal forceMount>
                            <DropdownMenuContent className="border border-gray-200" >
                                <DropdownMenuLabel className='font-bold text-xs'>Logs</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex justify-between flex-col">
                                    <p>Nothing Happend</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>


                    <DropdownMenu modal={false} open={openLanguage} onOpenChange={setOpenLanguage}>
                        <DropdownMenuTrigger>
                            <Button
                                variant="ghost"
                                className="flex flex-row gap-2 items-center">
                                <div className="text-black text-sm font-semibold font-['Poppins']">Eng</div>
                                <ChevronDown
                                    size={14}
                                    className={`transform ${openLanguage ? "-rotate-180 transition-transform" : "transition-transform"} transition-transform`}
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
                        <DropdownMenuTrigger className='flex flex-row items-start justify-start'>
                            <Button
                                variant="ghost"
                                className="flex flex-row gap-2 items-center justify-start"
                            >
                                <div className="justify-start items-center gap-3 flex p-2">
                                    {loading ? (
                                        <Skeleton className="w-[35px] h-[35px] rounded-full" />
                                    ) : (
                                        userimg !== "null" || userimg !== undefined || userimg === null ? (
                                            <Image
                                                src={"/assets/user-holder.svg"}
                                                width={20}
                                                height={20}
                                                alt="user image"
                                                className='object-cover rounded-full w-[20px] h-[20px]'
                                                style={{ borderRadius: "50%", width: "35px", height: "35px" }}
                                            />
                                        ) : (
                                            <Image
                                                src={"/assets/user-holder.svg"}
                                                width={20}
                                                height={20}
                                                alt="user image"
                                                className='object-cover rounded-full w-[20px] h-[20px]'
                                                style={{ borderRadius: "50%", width: "35px", height: "35px" }}
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
                                <DropdownMenuItem className="flex justify-between flex-col cursor-pointer" >
                                    <Link href="/#" passHref>
                                        <div className="flex flex-row justify-between gap-2 w-[170px]">
                                            <p>Account Setting</p>
                                            <Settings width={20} height={20} />
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => hanldeLogout()}
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
                </div>
            </nav>
        </>
    )
}

