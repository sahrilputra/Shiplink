'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'

export const AssitedTableOrder = ({ data, handleData }) => {
    const [clickedRowId, setClickedRowId] = useState(null);

    const handleDataID = (id) => {
        handleData(id);
        setClickedRowId((prevId) => (prevId === id ? null : id));
    }

    return (
        <>
            <div className="w-full p-5">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableHead className="w-[100px] rounded-tl-md rounded-bl-md">ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="w-[50px] text-center">Qty</TableHead>
                        <TableHead className="text-right">Product Price</TableHead>
                        <TableHead className="text-right">Price Amount</TableHead>
                        <TableHead className="text-center rounded-tr-md rounded-br-md">Status</TableHead>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, i) => (
                            <TableRow
                                className={`${clickedRowId === item.id ? "bg-blue-300/30 " : ""} cursor-pointer`}
                                key={item.id}
                                onClick={() =>
                                    handleDataID(item.id)
                                }
                            >
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell className="text-center">{item.Qty}</TableCell>
                                <TableCell className="text-right">{item.productPrice}</TableCell>
                                <TableCell className="text-right">{item.priceAmount}</TableCell>
                                <TableCell className="text-center">{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
