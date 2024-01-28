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

export function WarehouseDataList({ data, isOpen, setOpen }) {

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
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[60px] text-center">
                    <Checkbox className="w-4 h-4" />
                </TableHead>
                <TableHead className="w-[200px] text-center">ID</TableHead>
                <TableHead className="w-[200px] ">Name</TableHead>
                <TableHead className="w-[200px] ">Address</TableHead>
                <TableHead className="w-[200px] ">Phone</TableHead>
                <TableHead className="w-[200px] ">Email</TableHead>
                <TableHead className="w-[100px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item?.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-50px`} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px] w-[50px]">
                                    <Checkbox className="w-4 h-4" />
                                </TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.id}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Name}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Address}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Phone}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Email}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="sm"
                                            className="h-6 px-2"
                                        >
                                            <p className="text-xs">Details</p>
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm w-6 h-6`}
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
