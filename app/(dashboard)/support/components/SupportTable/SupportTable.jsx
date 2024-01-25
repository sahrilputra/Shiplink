'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'
export const SupportTable = ({ data, onRowClick }) => {


    console.log(data)
    return (
        <>
            <div className="w-full p-2">
                <Table className="p-3">
                    <TableCaption>A List Support Tickets.</TableCaption>
                    <TableHeader className="text-xs">
                        <TableHead className="w-[100px] rounded-tl-md ">Ticket ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className=" text-right">Date</TableHead>
                        <TableHead className="text-center rounded-tr-md ">Status</TableHead>

                    </TableHeader>
                    <TableBody>
                        {data.tickets.map((ticket) => (
                            <>
                                <TableRow
                                    className=" cursor-pointer text-sm"
                                    key={ticket.ticket_id}
                                    onClick={() => onRowClick(ticket)}
                                >
                                    <TableCell className="font-medium text-xs">{ticket.ticket_id}</TableCell>
                                    <TableCell className="font-medium text-xs">{ticket.description}</TableCell>
                                    <TableCell className="text-right text-xs">{ticket.created_at}</TableCell>
                                    <TableCell className="text-center text-xs">{ticket.status}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
