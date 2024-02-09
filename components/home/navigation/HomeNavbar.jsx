'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'

export const HomeNavbar = () => {
    const [isSolidBackground, setIsSolidBackground] = useState(false);

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

            <div className="flex text-white flex-row gap-[30px] justify-end items-center">
                <NextLink href={'/cross-border'} className='cursor-pointer hover:opacity-70'>
                    <p className='text-base font-extralight'>Cross-Border Mailbox</p>
                </NextLink>
                <p className='text-base font-extralight'>Shipping Labels</p>
                <p className='text-base font-extralight'>Shipping Supplies</p>
                <NextLink href={"/aboutUs"} className='cursor-pointer hover:opacity-70'>
                    <p className='text-base font-extralight'>About Us</p>
                </NextLink>
                <p className='text-base font-bold'>EN</p>
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
        </div>
    )
}
