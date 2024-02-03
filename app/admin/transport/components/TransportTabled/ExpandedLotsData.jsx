import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
export const ExpandedLotsData = () => {
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Last Update</TableHead>
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">PARS</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Total Items</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>11/04/2023 11:30:30</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>12131231231</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>100 Package</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table></>
    )
}
