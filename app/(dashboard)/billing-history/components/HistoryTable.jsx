import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'

export const HistoryTable = () => {
    return (
        <>
            <div className="w-full p-5 text-sm">
                <Table>
                    <TableCaption className="text-xs">A list of your recent billing history.</TableCaption>
                    <TableHeader className="text-xs">
                            <TableHead className="w-[10%] rounded-tl-md ">Invoice No</TableHead>
                            <TableHead className="w-[20%]">Date</TableHead>
                            <TableHead className="w-[50%]">Name</TableHead>
                            <TableHead className="w-[10%] text-center">Total</TableHead>
                            <TableHead className="text-center rounded-tr-md ">Invoice</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="text-xs">
                            <TableCell className="font-medium">12345612</TableCell>
                            <TableCell>27/3/2023 22:22:30 PM </TableCell>
                            <TableCell>Membership Premium </TableCell>
                            <TableCell className="text-right">$298.00</TableCell>
                            <TableCell className="text-center text-myBlue underline">Download</TableCell>
                        </TableRow>
                        <TableRow className="text-xs">
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
