'use client'
import React, { useEffect, useState } from 'react'
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
import { ChevronDown } from 'lucide-react';
import { useTimeFormat } from '@/context/TimeFormatProvider'
import moment from "moment";
export const ExpandedLotsData = ({ data, lotsID, setExpandedRows, reload, status_id }) => {
    console.log("🚀 ~ ExpandedLotsData ~ data:", data)
    const { timeFormat, dateFormat } = useTimeFormat();
    const [documentsData, setDocumentsData] = useState([]);

    useEffect(() => {
        if (data.documents) {
            const sliceDocuments = data.documents.split(',')
            setDocumentsData(sliceDocuments)
        } else {
            setDocumentsData([]);
        }
    }, [data]);

    console.log("🚀 ~ ExpandedLotsData ~ documentsData:", documentsData)

    const { toast } = useToast()
    const [openInv, setOpenInv] = useState(false)
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
                    status_id: 6
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
                        <TableCell className="font-medium text-xs h-7 p-0 px-5 py-2">
                            {
                                data?.updated_at ? (
                                    <p>{moment(data.updated_at).format(`${dateFormat}, ${timeFormat}`)}</p>
                                ) : (
                                    <p>-</p>
                                )
                            }
                        </TableCell>
                        <TableCell className="font-medium text-xs h-7 p-0 px-5 py-2">
                            <p>{data?.trip_number || "-"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs h-7 p-0 px-5 py-2">
                            {/* {
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
                            } */}
                            <div className="">
                                <DropdownMenu open={openInv} onOpenChange={setOpenInv}>
                                    <DropdownMenuTrigger className="p-0 px-0 h-8 text-xs focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-zinc-300 w-[250px] pr-2 flex flex-row">
                                        <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white my-auto h-full flex items-center px-3'>Documents</p>
                                        <div className='text-xs flex h-full border pl-3 w-[250px] bg-white  rounded-tr rounded-br focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 items-center justify-between px-2  border-slate-300 ring-offset-white text-slate-500" ' >
                                            {documentsData.length <= 0 ? "No Documents" : "View Documents"}
                                            <ChevronDown width={15} height={15} className={`${openInv ? "transition-transform rotate-180" : ""} transition-transform`} />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[250px]">
                                        {
                                            documentsData.length > 0 ? (
                                                documentsData.map((item, index) => (
                                                    <NextLink
                                                        key={index}
                                                        href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${item}`}
                                                        passHref
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        <DropdownMenuItem className="text-xs text-myBlue" value="light">View Documents {index + 1}</DropdownMenuItem>
                                                    </NextLink>
                                                ))
                                            ) : (
                                                <DropdownMenuItem
                                                    disabled={true}
                                                    className="text-xs text-myBlue text-center">
                                                    No Invoice
                                                </DropdownMenuItem>
                                            )
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>


                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2 w-max ">
                            <div className="flex-row flex justify-between gap-3">
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
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table ></>
    )
}
