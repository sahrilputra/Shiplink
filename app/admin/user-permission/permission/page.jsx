
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
import { PermissionTableComponents } from '../profiles/[slug]/permission/components/PermissionTableComponents'

export default function RolePermissionPage({ params }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 justify-between items-end">
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
