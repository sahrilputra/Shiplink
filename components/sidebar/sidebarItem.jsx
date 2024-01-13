import React from 'react'
import NextLink from 'next/link';
import clsx from 'clsx';

export const SidebarItem = ({ icon, title, isActive, href }) => {
    return (
        <>
            <NextLink
                className="tw-[257px] px-[21px]  rounded-lg justify-start items-center gap-5 inline-flex"
                href={href}>
                {isActive ? (
                    <>
                        <div className="w-[257px] px-[21px] py-2.5 bg-red-700 rounded-lg justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <div className="w-[45.83px] h-[50px] left-[-14.17px] top-[-16.67px] fill-white">{icon}</div>
                            </div>
                            <div className="justify-start items-start gap-[18px] flex">
                                <div className="w-[191px] text-white text-sm font-semibold font-['Poppins']">{title}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-[257px] px-[21px] py-2.5 rounded-lg justify-start items-center gap-5 inline-flex hover:bg-red-100">
                            <div className="w-[25px] h-[25px] relative">
                                <div className="w-[45.83px] h-[50px] left-[-14.17px] top-[-16.67px] fill-black opacity-40">{icon}</div>
                            </div>
                            <div className="opacity-50 justify-start items-start gap-[18px] flex">
                                <div className="w-[191px] text-black text-[15px] font-normal font-['Poppins']">{title}</div>
                            </div>
                        </div>
                    </>
                )}
                {/* <div className="w-[257px] px-[21px] py-2.5 bg-red-700 rounded-lg justify-start items-center gap-5 inline-flex">
                    <div className="w-[25px] h-[25px] relative">
                        <div className="w-[45.83px] h-[50px] left-[-14.17px] top-[-16.67px] fill-white">{icon}</div>
                    </div>
                    <div className="justify-start items-start gap-[18px] flex">
                        <div className="w-[191px] text-white text-sm font-semibold font-['Poppins']">{title}</div>
                    </div>
                </div> */}
            </NextLink>
        </>
    )
}
