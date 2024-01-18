'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/tableDashboard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
export const NotifTable = () => {
    return (
        <>
            <div className="tableContent w-full">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" rounded-tl-md "></TableHead>
                            <TableHead className="w-[100px] text-center ">Email</TableHead>
                            <TableHead className="w-[100px] text-center rounded-tr-md">Feed</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium flex flex-col rounded-bl-md">
                                <p className='text-zinc-900 text-lg font-medium'>One-day Pickup Reminder</p>
                                <div className=" text-zinc-600 font-normal text-sm leading-snug">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</div>
                            </TableCell>
                            <TableCell className="text-center px-2"><Checkbox /></TableCell>
                            <TableCell className="text-center rounded-br-md px-2"><Checkbox /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium flex flex-col rounded-bl-md">
                                <p className='text-zinc-900 text-lg font-medium'>One-day Pickup Reminder</p>
                                <div className=" text-zinc-600 font-normal text-sm leading-snug">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</div>
                            </TableCell>
                            <TableCell className="text-center px-2"><Checkbox /></TableCell>
                            <TableCell className="text-center rounded-br-md px-2"><Checkbox /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium flex flex-col rounded-bl-md">
                                <p className='text-zinc-900 text-lg font-medium'>One-day Pickup Reminder</p>
                                <div className=" text-zinc-600 font-normal text-sm leading-snug">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</div>
                            </TableCell>
                            <TableCell className="text-center px-2"><Checkbox /></TableCell>
                            <TableCell className="text-center rounded-br-md px-2"><Checkbox /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium flex flex-col rounded-bl-md">
                                <p className='text-zinc-900 text-lg font-medium'>One-day Pickup Reminder</p>
                                <div className=" text-zinc-600 font-normal text-sm leading-snug">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</div>
                            </TableCell>
                            <TableCell className="text-center px-2"><Checkbox /></TableCell>
                            <TableCell className="text-center rounded-br-md px-2"><Checkbox /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div className="py-5 flex justify-end ">
                    <Button
                        variant="destructive"
                    >
                        Save Settings
                    </Button>
                </div>
            </div>
        </>
    )
}
