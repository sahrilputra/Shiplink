'use client'
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/tableDashboard"
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { ExternalLink } from "lucide-react";
import NextLink from "next/link"

export function SingleItemsTable({ data, isOpen, setOpen }) {

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };

    const toggleOpenChange = () => {
        setOpen(true)
    }
    return (
        <Table className="border border-zinc-300 rounded-sm">
            <TableHeader className="text-sm bg-white text-black">
                <TableHead colSpan={8} className="p-4 " >
                    <div className="flex flex-row justify-between">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <FilterIcons fill="#CC0019" />
                            </Button>
                            <DatePickerWithRange className={"text-black"} />
                        </div>
                        <div className="">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="px-10"
                                onClick={() => toggleOpenChange()}
                            >
                                <p className=" text-xs">Assign to Lot</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[80px]">Tracking ID</TableHead>
                <TableHead >Customer Name</TableHead>
                <TableHead className="w-[130px]">Origin</TableHead>
                <TableHead className="w-[130px]">Destination</TableHead>
                <TableHead className="w-[180px]">Last Update</TableHead>
                <TableHead className="w-[180px]">Customs Status</TableHead>
                <TableHead className=""></TableHead>
                <TableHead className=""> <Checkbox className="w-4 h-4" /></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`h-[50px] `} >
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.TrackingID}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.CustomerName}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.Origin}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.Destination}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.LastUpdate}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.CustomStatus}</TableCell>
                                <TableCell className="w-[30px]  p-0 h-7 px-5 py-2">
                                    <div className="flex flex-row gap-2">
                                        <NextLink href={"/admin/package-details/2"}>
                                            <Button
                                                variant="ghost"
                                                className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                                <p>Details</p>
                                                <ExternalLink width={10} height={10} />
                                            </Button>
                                        </NextLink>
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleOpenChange()}
                                        >
                                            <p className="text-[11px]">Assign</p>
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="p-0 h-7 px-5 py-2">
                                    <Checkbox className="w-4 h-4 fill-white" />
                                </TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
