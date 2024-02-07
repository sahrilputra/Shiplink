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
export function LotsItemsTable({ data, isOpen, setOpen }) {
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
                                    size="filter"
                                    className='border border-zinc-300 flex items-center rounded'>
                                    <FilterIcons
                                        className=""
                                        fill="#CC0019" />
                                </Button>
                                <DatePickerWithRange className={"text-black"} />
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
                <TableHeader className="text-xs">
                    <TableHead className="text-xs w-[80px]">Lots ID</TableHead>
                    <TableHead className="text-xs ">Lots Labels</TableHead>
                    <TableHead className="text-xs ">Destination</TableHead>
                    <TableHead className="text-xs w-[130px]">Documents</TableHead>
                    <TableHead className="text-xs w-[180px]">Manifest</TableHead>
                    <TableHead className="text-xs w-[180px]">Status</TableHead>
                    <TableHead className="text-xs w-[130px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} `} >
                                    <TableCell className="font-medium text-xs">{item.LotsID}</TableCell>
                                    <TableCell className="font-medium text-xs">{item.LotsLabel}</TableCell>
                                    <TableCell className="font-medium text-xs">{item.Destination}</TableCell>
                                    <TableCell className="font-medium text-xs">{item.Documents}</TableCell>
                                    <TableCell className="font-medium text-xs">{item.Manifest}</TableCell>
                                    <TableCell className="font-medium text-xs">{item.Status}</TableCell>
                                    <TableCell className="w-[130px]">
                                        <div className="flex w-[130px] flex-row gap-2">
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={`rounded-sm w-max px-[5px] h-[25px]`}
                                                onClick={() => setEditDialog(true)}
                                            >
                                                <p className="text-[11px]">Edit Lots</p>
                                            </Button>
                                            <LotsMoreMenusDropDrown data={data} dataID={item.LotsID} />
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={`rounded-sm w-max px-[5px] h-[25px]`}
                                                onClick={() => toggleRow(index)}
                                            >
                                                <ArrowDownV2Icons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[index] ? 'rotate-180' : ''}`} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {expandedRows[index] && (
                                    <>
                                        <TableRow >
                                            <TableCell colSpan={7} className="w-full p-1 px-[10px] py-[10px] bg-blue-100">
                                                <ExpandedLotsData />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </>
                        ))
                    }
                </TableBody>
            </Table>
            <EditLotsDialog open={isEditDialog} setOpen={setEditDialog} />
        </>
    )
}