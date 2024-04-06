import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Button } from '@/components/ui/button'
import NextLink from 'next/link'
export const ExpandedLotsData = ({ data, lotsID }) => {
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Last Update</TableHead>
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Trip Number</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Total Items</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2 w-[150px]"></TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.updated_at || "undefined"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.trip_number || "undefined"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.total_items || "0"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0  px-5 py-2 w-max flex-row flex justify-between gap-3">
                            <NextLink passHref href={`/admin/transport/lots/${lotsID}`}>
                                <Button
                                    variant="secondary"
                                    size="xs"
                                    className="h-[25px] px-5 text-xs"
                                >
                                    <p>View Packages</p>
                                </Button>
                            </NextLink>
                            <Button
                                variant="destructive"
                                size="xs"
                                className="h-[25px] px-5 text-xs"
                            >
                                <p>Depart</p>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table></>
    )
}
