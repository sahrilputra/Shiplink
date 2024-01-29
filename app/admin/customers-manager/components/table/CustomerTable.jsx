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
import { DeleteIcons } from "@/components/icons/iconCollection";
import { MoreHorizontalIcon } from "lucide-react";

export function CustomerTable({ data, open, setOpen }) {

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }

    const toggleOpenDialog = () => {
        setOpen(!open)
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
                                className="w-[250px]"
                                onClick={() => toggleOpenDialog()}
                            >
                                <p className=" text-xs">Create New Customer</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className=" text-center">Unit ID</TableHead>
                <TableHead className=" ">Customer Name</TableHead>
                <TableHead className=" ">Date Created</TableHead>
                <TableHead className=" ">Last Login</TableHead>
                <TableHead className=" ">Membership</TableHead>
                <TableHead className=""></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-50px`} >

                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.UnitId}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CustomerName}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.DateCreated}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.LastLogin}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Membership}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleOpenChange()}
                                        >
                                            <p className="text-[11px] text-myBlue">Details</p>
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleOpenChange()}
                                        >
                                            <MoreHorizontalIcon width={15} height={15} />
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
