"use client";
import React from 'react'
import NextLink from 'next/link';
import clsx from 'clsx';
import styles from './styles.module.scss'
import { Separator } from '../ui/separator';
export const SidebarItem = ({ icon, title, isActive, href, isLast, isFirst = "false" }) => {


    return (
        <>
            <NextLink
                className=" px-[10px] justify-start items-center gap-2 inline-flex"
                href={href}>
                {isActive ? (
                    <>
                        <div className={`${styles.content} px-[15px] py-2 bg-red-700 rounded-md justify-start items-center gap-3 flex w-[220px]`}>
                            <div className={`${styles.icons}  h-[25px] relative`}>
                                <div className="w-[30px] h-[50px] text-white top-[-16.67px] fill-white stroke-white">{icon}</div>
                            </div>
                            <div className={`${styles.title} justify-start items-start gap-[18px] flex`}>
                                <div className=" text-white text-[14px] font-semibold font-['Poppins']">{title}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col w-max ">
                            {
                                isFirst === 'true' ? (
                                    <div className="w-full mx-auto">
                                        <div className="w-[80%] mx-auto">
                                            <Separator className="h-[1px] " />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full mx-auto">
                                        <div className="w-[80%] mx-auto">
                                            <Separator className="h-[1px] " />
                                        </div>
                                    </div>
                                )
                            }
                            <div className={`${styles.content} px-[15px] py-2 rounded-md justify-start items-center gap-3 flex w-[220px] hover:bg-red-700/30 transition-colors duration-200`}>
                                <div className={`${styles.icons} h-[25px] relative`}>
                                    <div className="w-[30px] h-[50px] top-[-16.67px] fill-black stroke-black opacity-40">{icon}</div>
                                </div>
                                <div className={`${styles.title} opacity-50 justify-start items-start gap-[18px] flex`}>
                                    <div className=" text-black text-[14px] font-normal font-['Poppins']">{title}</div>
                                </div>
                            </div>

                            {
                                isLast === 'true' ? (
                                    <div className="w-full mx-auto">
                                        <div className="w-[80%] mx-auto">
                                            <Separator className="h-[1px] " />
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </>
                )}
            </NextLink>
        </>
    )
}
