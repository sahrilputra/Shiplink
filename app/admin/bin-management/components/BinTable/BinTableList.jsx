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
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
export function BinTableList({ data, isOpen, setOpen, handleSelect, setCreateNewDialog, isSelected }) {

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
        <Table>
            <TableHeader className="text-sm bg-white text-black">
                <TableHead colSpan={5} className="p-2" >
                    <div className="flex w-full flex-row justify-between gap-1 items-center">
                        <div className=" w-full flex flex-row gap-2 items-center">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="filter"
                                className='border border-zinc-300 flex items-center rounded'>
                                <FilterIcons
                                    className=""
                                    fill="#CC0019" />
                            </Button>
                        </div>
                        <div className="w-[40%] flex justify-end  ">
                            <Button
                                onClick={() => setCreateNewDialog(true)}
                                variant="filter"
                                size="icon"
                                className='w-[34px] h-[34px]  border border-neutral-200 flex items-center'>
                                <Plus fill="#CC0019" />
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[50px]">
                    <Checkbox />
                </TableHead>
                <TableHead className=" text-xs">ID</TableHead>
                <TableHead className=" text-xs">Row</TableHead>
                <TableHead className=" text-xs">Section</TableHead>
                <TableHead className=" text-xs">Level</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow
                                key={item.id}
                                className={`${isSelected === item.id ? " bg-blue-200" : ""} cursor-pointer`}
                                onClick={() => handleSelect(item.id)} >
                                <TableCell className=" w-[50px]"> <Checkbox /></TableCell>
                                <TableCell className=" ">{item.id}</TableCell>
                                <TableCell className=" ">{item.Row}</TableCell>
                                <TableCell className=" ">{item.Section}</TableCell>
                                <TableCell className=" ">{item.Level}</TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
