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
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { EditLotsDialog } from "../AssignLotsDialog/EditLotsDialog";
import { LotsMoreMenusDropDrown } from "../menus/LotsMoreMenus";
import { ExpandedLotsData } from "./ExpandedLotsData";
import NextLink from "next/link"

export function LotsDetailsTable({ data, isOpen, setOpen }) {
    const [isEditDialog, setEditDialog] = useState(false);

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
        <>
            <Table className="border border-zinc-300 rounded-sm">
                <TableHeader className="text-sm bg-white text-black">
                    <TableHead colSpan={7} className="p-4 " >
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

                        </div>
                    </TableHead>
                </TableHeader>
                <TableHeader className="text-sm">
                    <TableHead className="w-[80px]">Tracking ID</TableHead>
                    <TableHead >Customer Name</TableHead>
                    <TableHead className="">Origin</TableHead>
                    <TableHead className="w-[130px]">Destination</TableHead>
                    <TableHead className="w-[180px]">Last Update</TableHead>
                    <TableHead className="w-[180px]">Bin Location</TableHead>
                    <TableHead className="w-[140px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow key={item.TrackingID} className={` h-[50px]`} >
                                    <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.TrackingID}</TableCell>
                                    <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CustomerName}</TableCell>
                                    <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Origin}</TableCell>
                                    <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Destination}</TableCell>
                                    <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.LastUpdate}</TableCell>
                                    <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.BinLocation}</TableCell>
                                    <TableCell className="p-1 px-[20px] py-[10px]">
                                        <div className="flex w-[140px] flex-row gap-2">
                                            <NextLink href={`/admin/package-details/${item.CustomerName}`}>
                                                <Button
                                                    variant="tableBlue"
                                                    size="tableIcon"
                                                    className={`rounded-sm w-max px-[5px] h-[25px]`}
                                                >
                                                    <p className="text-[11px]">Details</p>
                                                </Button>
                                            </NextLink>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))
                    }
                </TableBody>
            </Table>
            <EditLotsDialog open={isEditDialog} setOpen={setEditDialog} />
        </>
    )
}
