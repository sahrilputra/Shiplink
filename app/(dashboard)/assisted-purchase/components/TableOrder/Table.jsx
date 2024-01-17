import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'

export const AssitedTableOrder = () => {
    return (
        <>
            <div className="w-full p-5">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] rounded-tl-md rounded-bl-md">ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="w-[50px] text-center">Qty</TableHead>
                            <TableHead className="text-right">Product Price</TableHead>
                            <TableHead className="text-right">Price Amount</TableHead>
                            <TableHead className="text-center rounded-tr-md rounded-br-md">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="">
                            <TableCell className="font-medium">#5635342808</TableCell>
                            <TableCell>27/3/2023 </TableCell>
                            <TableCell>TechNova Smartwatch</TableCell>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                            <TableCell className="text-right">$150.00</TableCell>
                            <TableCell className="text-center">Received</TableCell>
                        </TableRow>
                        <TableRow className="">
                            <TableCell className="font-medium">#5635342808</TableCell>
                            <TableCell>27/3/2023 </TableCell>
                            <TableCell>TechNova Smartwatch</TableCell>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                            <TableCell className="text-right">$150.00</TableCell>
                            <TableCell className="text-center">Received</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
