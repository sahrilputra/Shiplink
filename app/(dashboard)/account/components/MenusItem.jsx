import React from 'react'
import NextLink from 'next/link';
import { Button } from '@/components/ui/button';
export const MenusItem = ({ title, icon, isActive, href }) => {
    return (
        <>
            {isActive ? (
                <>
                    <NextLink
                        href={href}
                        className='w-full flex items-center justify-start text-sm'
                    >
                        <Button
                            variant="ghost"
                            className="flex flex-row gap-5 items-center bg-slate-400 bg-opacity-30 justify-start w-full px-[5px] py-[5px]"
                        >
                            <div className="w-[20px] h-[20px] m-2">
                                {icon}
                            </div>
                            <div className="text-black text-sm ">{title}</div>
                        </Button>
                    </NextLink>
                </>
            ) : (
                <>
                    <NextLink
                        href={href}
                        className='w-full flex items-center justify-start'
                    >
                        <Button
                            variant="ghost"
                            className="flex flex-row gap-5 items-center justify-start w-full px-[5px] py-[5px]"
                        >
                            <div className="w-[20px] h-[20px] m-2">
                                {icon}
                            </div>
                            <div className="text-black text-sm ">{title}</div>
                        </Button>
                    </NextLink>
                </>
            )}

        </>
    )
}
