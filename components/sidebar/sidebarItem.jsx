"use client";
import React, { useState } from 'react'
import NextLink from 'next/link';
import clsx from 'clsx';
import styles from './styles.module.scss'
import { Separator } from '../ui/separator';
export const SidebarItem = ({ icon, isClicked, title, isActive, href, isLast, isFirst = "false" }) => {


    return (
        <>
            <NextLink
                className=" px-[10px] "
                href={href}
            >

                <div className={`grid place-items-center items-center h-[40px] rounded-[3px] 
                 ${isActive ? "bg-red-700 text-white opacity-100" : isClicked ? "bg-blue-700" : "opacity-50 hover:bg-red-700/30 transition-colors duration-200"}
                `}>
                    <div className={`${isActive ? "text-white border-none " : "text-black"} ${isLast ? " border-b" : ""} flex flex-row items-center h-full justify-center gap-3 w-[210px] px-[15px] border-t border-zinc-300`}>
                        <div className={`${styles.icons} ${isActive && 'text-white fill-white stroke-white'}`}>
                            {icon}
                        </div>
                        <div className={`${styles.title} justify-start items-start flex`}>
                            <div className=" text-[14px] font-semibold font-['Poppins']">{title}</div>
                        </div>
                    </div>
                </div>
                {/* ${isActive ? "hidden" : "block"}  */}

                {/* <div
                    className={`${styles.content}
                    ${isActive ? "bg-red-700 text-white opacity-100" : isClicked ? "bg-blue-700" : "opacity-50 hover:bg-red-700/30 transition-colors duration-200"}
                    rounded-[5px] `}
                >
                    <div className={`w-[80%] mx-auto h-[1.5px]`}>
                        <Separator className={`${isActive ? "hidden" : "block"} h-[1px] font-bold bg-zinc-300`} />
                    </div>

                    <div className={`${isActive ? "text-white " : "text-black"} flex flex-row gap-3 items-center  px-[15px] py-2  justify-start w-[220px]`}>
                        <div className={`${styles.icons} h-[25px] relative`}>
                            <div className={`${isActive && 'text-white fill-white stroke-white'} w-[30px] h-[30px]`}>{icon}</div>
                        </div>
                        <div className={`${styles.title} justify-start items-start gap-[18px] flex`}>
                            <div className="  text-[14px] font-semibold font-['Poppins']">{title}</div>
                        </div>
                    </div>

                    <div className={` "w-[80%] mx-auto`}>
                        <Separator className={`${isLast && !(isActive) ? "block" : isLast && isActive ? "hidden" : "hidden"} h-[1px] bg-zinc-300`} />
                    </div>

                </div> */}
            </NextLink >
        </>
    )
}


// <>
// <NextLink
//     className=" px-[10px] justify-start items-center gap-2 inline-flex"
//     href={href}
// >
//     {isActive ? (
//         <>
//             <div className={`${styles.content} px-[15px] py-2 bg-red-700 rounded-md justify-start items-center gap-3 flex w-[220px]`}>
//                 <div className={`${styles.icons}  h-[25px] relative`}>
//                     <div className="w-[30px] h-[50px] text-white top-[-16.67px] fill-white stroke-white">{icon}</div>
//                 </div>
//                 <div className={`${styles.title} justify-start items-start gap-[18px] flex`}>
//                     <div className=" text-white text-[14px] font-semibold font-['Poppins']">{title}</div>
//                 </div>
//             </div>
//         </>
//     ) : (
//         <>
//             <div className="flex flex-col w-max ">
//                 {/* {
//                     isFirst === 'true' ? (
//                         <div className="w-full mx-auto">
//                             <div className="w-[80%] mx-auto">
//                                 <Separator className="h-[1px] " />
//                             </div>
//                         </div>
//                     ) : null
//                 } */}
//                 <div className="w-full mx-auto">
//                     <div className="w-[80%] mx-auto">
//                         <Separator className="h-[1px] " />
//                     </div>
//                 </div>
//                 <div className={`${styles.content} ${isClicked ? "bg-green-300" : "px-[15px] py-2 rounded-md justify-start items-center gap-3 flex w-[220px] hover:bg-red-700/30 transition-colors duration-200 "}`}>
//                     <div className={`${styles.icons} h-[25px] relative`}>
//                         <div className="w-[30px] h-[50px] top-[-16.67px] fill-black stroke-black opacity-40">{icon}</div>
//                     </div>
//                     <div className={`${styles.title} opacity-50 justify-start items-start gap-[18px] flex`}>
//                         <div className=" text-black text-[14px] font-normal font-['Poppins']">{title}</div>
//                     </div>
//                 </div>

//                 {
//                     isLast === 'true' ? (
//                         <div className="w-full mx-auto">
//                             <div className="w-[80%] mx-auto">
//                                 <Separator className="h-[1px] " />
//                             </div>
//                         </div>
//                     ) : null
//                 }
//             </div>
//         </>
//     )}
// </NextLink>
// </>