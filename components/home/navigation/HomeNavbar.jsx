'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
import styles from './styles.module.scss'

import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useMediaQuery } from 'react-responsive'
export const HomeNavbar = () => {
    const [isSolidBackground, setIsSolidBackground] = useState(false);
    const [open, setOpen] = useState(false)

    const isTable = useMediaQuery({ query: "(min-width: 900px)" });
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsSolidBackground(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`w-full flex flex-row px-10 h-[70px] justify-between items-center transition-colors duration-100 z-50 ${isSolidBackground ? 'bg-gradient-to-r from-red-700 to-red-800' : 'bg-gradient-to-r from-red-700 to-transparent transition-colors duration-100'} fixed`}>
            <div className="">
                <p className='text-2xl font-bold text-white'>Shiplink</p>
            </div>

            {
                isTable ? (
                    <div className={`${styles.list} flex text-white flex-row gap-[30px] justify-end items-center`}>
                        <NextLink href={'/cross-border'} className='cursor-pointer hover:opacity-70'>
                            <p className={`text-base font-extralight ${styles.listItem}`}>Cross-Border Mailbox</p>
                        </NextLink>
                        <NextLink href={"/shippingLabels"} className='cursor-pointer hover:opacity-70'>
                            <p className={`text-base font-extralight ${styles.listItem}`}>Shipping Labels</p>
                        </NextLink>
                        <p className={`text-base font-extralight ${styles.listItem}`}>Shipping Supplies</p>
                        <NextLink href={"/aboutUs"} className='cursor-pointer hover:opacity-70'>
                            <p className={`text-base font-extralight ${styles.listItem}`}>About Us</p>
                        </NextLink>
                        <p className={`text-base font-extralight ${styles.listItem}`}>EN</p>
                        <div className="flex flex-row gap-[24px]">
                            <NextLink href={'/login/customer/signup'} >
                                <Button
                                    variant='outline'
                                    className="w-[126px] text-white bg-transparent border border-white"
                                >
                                    <p className='text-base'>Sign Up</p>
                                </Button>
                            </NextLink>

                            <NextLink href={'/login/customer'} >
                                <Button
                                    variant='destructive'
                                    className="w-[126px]"
                                >
                                    <p className='text-base'>Login</p>
                                </Button>
                            </NextLink>
                        </div>
                    </div>

                ) : (
                    <div className={`${styles.menu}`}>
                        <Button
                            variant="outline"
                            className="bg-none"
                            size="sm"
                            onClick={() => { setOpen(true) }}
                        >
                            <Menu width={15} height={15} />
                        </Button>
                    </div>
                )
            }

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <div className={`flex text-black flex-col gap-[10px] justify-start items-start w-full`}>
                        <NextLink href={'/cross-border'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>Cross-Border Mailbox</p>
                            </Button>
                        </NextLink>
                        <NextLink href={'/shippingLabels'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>Shipping Labels</p>
                            </Button>
                        </NextLink>

                        <NextLink href={'#'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>Shipping Supplies</p>
                            </Button>
                        </NextLink>
                        <NextLink href={'/aboutUs'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>About Us</p>
                            </Button>
                        </NextLink>
                        <Button
                            variant="ghost"
                            className="w-full text-left justify-start"
                        >
                            <p className={`text-sm text-left font-extralight`}>EN</p>
                        </Button>
                        <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
                            <NextLink href={'/login/customer/signup'} passHref className='w-full'>
                                <Button
                                    variant='redOutline'
                                    className="w-[100%]"
                                >
                                    <p className='text-sm'>Sign Up</p>
                                </Button>
                            </NextLink>

                            <NextLink href={'/login/customer'} passHref className='w-full'>
                                <Button
                                    variant='destructive'
                                    className="w-[100%]"
                                >
                                    <p className='text-sm'>Login</p>
                                </Button>
                            </NextLink>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}
