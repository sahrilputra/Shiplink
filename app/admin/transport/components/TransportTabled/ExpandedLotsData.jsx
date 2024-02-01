import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
export const ExpandedLotsData = () => {
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className=" text-myBlue font-bold text-xs">Last Update</TableHead>
                    <TableHead className=" text-myBlue font-bold text-xs">PARS</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs">Total Items</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>11/04/2023 11:30:30</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>12131231231</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>100 Package</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table></>
    )
}
