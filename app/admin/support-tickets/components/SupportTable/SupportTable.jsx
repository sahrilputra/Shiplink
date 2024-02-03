'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { FilterIcons } from '@/components/icons/iconCollection'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import { Checkbox } from '@/components/ui/checkbox'
import CreateNewTickets from '../dialog/NewTickets'
export const SupportTable = ({ data, onRowClick, onHide, open, setOpen }) => {
    
    const toggleOpenDialog = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className="w-full p-2">

                <div className="text-sm bg-white text-black">
                    <div colSpan={7} className="p-4 " >
                        <div className="flex flex-row justify-between">
                            <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                                <SearchBar />
                                <Button
                                    variant="filter"
                                    size="icon"
                               
                                    className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                    <FilterIcons fill="#CC0019" />
                                </Button>
                                <DatePickerWithRange className={"text-black"} />
                            </div>
                            <div className="">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="px-4"
                                    onClick={() => toggleOpenDialog()}
                                >
                                    <p className=" text-xs">Create New Tickets</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Table className="p-3">
                    {onHide
                        ? (
                            <>
                                <TableHeader className="text-xs">
                                    <TableHead className="w-[50px] rounded-tl-md ">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead>Open Date</TableHead>
                                    <TableHead className="">Subject</TableHead>
                                    <TableHead className=" ">Status</TableHead>
                                    <TableHead className=" rounded-tr-md "></TableHead>
                                </TableHeader>
                            </>
                        ) : (
                            <>
                                <TableHeader>
                                    <TableHead className="w-[50px] rounded-tl-md ">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="w-[100px] ">Ticket ID</TableHead>
                                    <TableHead>Open Date</TableHead>
                                    <TableHead className="">Subject</TableHead>
                                    <TableHead className=" ">Customer</TableHead>
                                    <TableHead className=" ">Reply By</TableHead>
                                    <TableHead className=" ">Status</TableHead>
                                    <TableHead className=" rounded-tr-md "></TableHead>
                                </TableHeader>
                            </>
                        )}

                    <TableBody>
                        {data.map((ticket) => (
                            <>
                                {onHide ? (
                                    <>
                                        <TableRow
                                            className=" cursor-pointer text-sm"
                                            key={ticket.TicketsID}
                                            onClick={() => onRowClick(ticket)}>
                                            <TableCell className="font-medium text-xs h-8 px-5 py-2"><Checkbox /></TableCell>
                                            <TableCell className="font-medium text-xs h-8 px-5 py-2">{ticket.OpenDate}</TableCell>
                                            <TableCell className="text-xs h-8 px-5 py-2">{ticket.Description}</TableCell>
                                            <TableCell className="text-center text-xs h-8 px-5 py-2">{ticket.Status}</TableCell>
                                            <TableCell className="text-center text-xs h-8 px-5 py-2">Action</TableCell>
                                        </TableRow>
                                    </>

                                ) : (
                                    <>
                                        <TableRow
                                            className=" cursor-pointer text-sm"
                                            key={ticket.TicketsID}
                                            onClick={() => onRowClick(ticket)}>
                                            <TableCell className="font-medium text-xs h-8 px-5 py-2"><Checkbox /></TableCell>
                                            <TableCell className="font-medium text-xs h-8 px-5 py-2">#{ticket.TicketsID}</TableCell>
                                            <TableCell className="font-medium text-xs h-8 px-5 py-2">{ticket.OpenDate}</TableCell>
                                            <TableCell className="text-xs h-8 px-5 py-2">{ticket.Description}</TableCell>
                                            <TableCell className="text-xs h-8 px-5 py-2">{ticket.Customer.Name}</TableCell>
                                            <TableCell className="text-center text-xs h-8 px-5 py-2">{ticket.ReplyBy}</TableCell>
                                            <TableCell className="text-center text-xs h-8 px-5 py-2">{ticket.Status}</TableCell>
                                            <TableCell className="text-center text-xs h-8 px-5 py-2">Action</TableCell>
                                        </TableRow>
                                    </>
                                )}

                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
