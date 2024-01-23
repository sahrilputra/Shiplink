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
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] rounded-tl-md ">Ticket ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className=" text-right">Date</TableHead>
                            <TableHead className="text-center rounded-tr-md ">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.tickets.map((ticket) => (
                            <>
                                <TableRow
                                    className=" cursor-pointer text-sm"
                                    key={ticket.ticket_id}
                                    onClick={() => onRowClick(ticket)}
                                >
                                    <TableCell className="font-medium">{ticket.ticket_id}</TableCell>
                                    <TableCell>{ticket.customer}</TableCell>
                                    <TableCell>{ticket.description}</TableCell>
                                    <TableCell className="text-right">{ticket.created_at}</TableCell>
                                    <TableCell className="text-center">{ticket.status}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
