import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Button } from '@/components/ui/button'
import axios from "axios";
import { useToast } from '@/components/ui/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import NextLink from 'next/link'
export const ExpandedLotsData = ({ data, lotsID, setExpandedRows, reload, status_id }) => {
    console.log("🚀 ~ ExpandedLotsData ~ data:", data)
    const { toast } = useToast()
    const handleDepartLots = async () => {
        if (data?.trip_number !== "") {
            setExpandedRows([])
            const response = await axios.post(
                `/api/admin/transport/lots/status/departLots`,
                {
                    LotsId: lotsID,
                    status_id: 2
                }
            );
            if (response.data.status === false) {
                toast({
                    title: "Error",
                    description: response.data.message,
                })
            } else {
                toast({
                    title: "Success",
                    description: response.data.message,
                })
            }
            reload()
        } else {
            toast({
                title: "Error",
                description: "Please add trip number first",
            })
        }
    }
    const handleArrivedLots = async () => {
        if (data?.trip_number !== "") {
            setExpandedRows([])
            const response = await axios.post(
                `/api/admin/transport/lots/status/departLots`,
                {
                    LotsId: lotsID,
                    status_id: 3
                }
            );
            if (response.data.status === false) {
                toast({
                    title: "Error",
                    message: response.data.message,
                })
            } else {
                toast({
                    title: "Success",
                    message: response.data.message,
                })
            }
            reload()
        } else {
            toast({
                title: "Error",
                message: "Please add trip number first",
            })
        }
    }
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Last Update</TableHead>
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Trip Number</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Documents</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2 w-[150px]"></TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.updated_at || "-"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.trip_number || "-"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            {
                                data.documents ?
                                    (
                                        <NextLink
                                            href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${data.documents}`}
                                            passHref
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <p className="text-xs underline text-myBlue">
                                                View
                                            </p>
                                        </NextLink>
                                    ) : (
                                        <p>No Documents</p>
                                    )
                            }


                        </TableCell>
                        <TableCell className="font-medium text-xs p-0  px-5 py-2 w-max flex-row flex justify-between gap-3">
                            <NextLink passHref href={`/admin/Lots_Details/${lotsID}`}>
                                <Button
                                    variant="secondary"
                                    size="xs"
                                    className="h-[25px] px-5 text-xs"
                                >
                                    <p>View Packages</p>
                                </Button>
                            </NextLink>
                            {
                                status_id === 2 ? (
                                    <Button
                                        variant="destructive"
                                        type="button"
                                        onClick={handleArrivedLots}
                                        size="xs"
                                        className="h-[25px] px-5 text-xs"
                                    >
                                        <p>Arrived</p>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="destructive"
                                        type="button"
                                        onClick={handleDepartLots}
                                        size="xs"
                                        className="h-[25px] px-5 text-xs"
                                    >
                                        <p>Depart</p>
                                    </Button>
                                )
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table ></>
    )
}
