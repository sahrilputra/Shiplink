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
import { DeleteIcon } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
export function PARSTable({ data, isOpen, setOpen }) {

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
    return (
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
                        <div className="">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-[100px]"
                            >
                                <p className=" text-xs">Print</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[60px]"></TableHead>
                <TableHead>PARS / PAPS Number</TableHead>
                <TableHead>Create Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="">Edit Date</TableHead>
                <TableHead className="">Action</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`h-[50px] `} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px] w-[50px]">
                                    <Checkbox className="w-4 h-4" />
                                </TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.SequencesRange}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CreateDate}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.AssignedTo}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.EditDate}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[10px]`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <p className="text-xs">Update</p>
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm  w-5 h-5`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm w-6 h-6`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <MoreHorizontalIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
