'use client'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { MenusComponents } from './components/MenusComponents';
import { PersonIcons } from '@/components/icons/iconCollection';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
export default function AccountLayout({ children }) {


    const { data: session } = useSession()
    const [users, setUser] = useState([])

    const customerImage = `https://sla.webelectron.com/api/Users/getprofileimages?fullName=${users.profile_picture}`
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/customerAPI/account/details`
                )
                console.log("🚀 ~ fetchData ~ response:", response)
                const responseData = response.data
                setUser(responseData.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    console.log("🚀 ~ AccountLayout ~ users:", users)
    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <div className={styles.profiles}>
                    <Avatar className="w-[80px] h-[80px]">
                        <AvatarImage src={customerImage} alt={session?.user?.name} /> : <AvatarImage src="/assets/user-holder.svg" />
                        <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                    <div className="info py-5 flex flex-col justify-center items-center gap-[5px]">
                        <div className=" flex flex-row gap-3 items-center text-sm">
                            <PersonIcons width={15} height={15} />
                            <p className='font-medium '>{session ? session.user.name : ""}</p>
                        </div>
                        <div className=" flex flex-row gap-3 items-center text-sm">
                            <NextLink passHref href={'/membership'}>
                                <Button
                                    className="flex flex-row gap-2 items-center text-sm"
                                    variant="ghost"
                                    size="xs"
                                >
                                    <Image
                                        src={'/assets/subscription/premium.svg'}
                                        width={20}
                                        height={20}
                                        alt='Subscription'
                                    />
                                    <p className='font-medium '>{users?.user_plan || "Free"}</p>
                                </Button>
                            </NextLink>
                        </div>
                    </div>
                </div>
                <div className="separat p-3">
                    <Separator className="py-[1px]" />
                </div>
                <MenusComponents />
            </div>

            <div className={styles.main}>
                {children}
            </div>
        </div >
    )
}
