
'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PermissionTableComponents } from './components/PermissionTableComponents'

export default function Permission({ params }) {
    return (
        <>
            <div className="flex flex-col gap-4">


                <div className="flex flex-row gap-2 justify-between items-end">
                    <div className="profiles flex flex-row gap-4 px-2 py-2 justify-items-start items-center w-full">
                        <div className="w-[70px]">
                            <img src="https://source.boringavatars.com/beam"
                                alt="avatar"
                                className='w-[50px] h-[50px] rounded-full object-cover'
                            />
                        </div>
                        <div className="info text-sm w-[200px]">
                            <p className='font-bold'>Jemth Smith</p>
                            <p className=' text-zinc-600'>#1234567</p>
                            <p className=' text-zinc-600'>jhon@shiplink.ca</p>
                            <p className=' text-zinc-600'>(+1) 781-491-0874 </p>
                            <p className=' text-zinc-600'>TR. Warehouse</p>
                        </div>
                    </div>
                    <div className="Role flex flex-col gap-4 items-end">
                        <div className="flex flex-col text-xs gap-2">
                            <p className='font-bold text-xs'>Select Role</p>
                            <Select className="text-xs bg-slate-400">
                                <SelectTrigger className="w-[180px] text-xs h-[40px] bg-slate-300/40">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent className="text-xs">
                                    <SelectItem className="text-xs" value="light">Light</SelectItem>
                                    <SelectItem className="text-xs" value="dark">Dark</SelectItem>
                                    <SelectItem className="text-xs" value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="">
                    <PermissionTableComponents />
                </div>
            </div>
        </>
    )
}
