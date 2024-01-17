import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'

export const HistoryTable = () => {
    return (
        <>
            <div className="w-full p-5">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px] rounded-tl-md ">Invoice No</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className=" text-right">Total</TableHead>
                            <TableHead className="text-center rounded-tr-md ">Invoice</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="">
                            <TableCell className="font-medium">12345612</TableCell>
                            <TableCell>27/3/2023 22:22:30 PM </TableCell>
                            <TableCell>Membership Premium </TableCell>
                            <TableCell className="text-right">$298.00</TableCell>
                            <TableCell className="text-center text-myBlue underline">Download</TableCell>

                        </TableRow>
                        <TableRow className="">
                            <TableCell className="font-medium">12345612</TableCell>
                            <TableCell>27/3/2023 22:22:30 PM </TableCell>
                            <TableCell>Membership Premium </TableCell>
                            <TableCell className="text-right">$298.00</TableCell>
                            <TableCell className="text-center text-myBlue underline">Download</TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
