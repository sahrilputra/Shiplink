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
export function BinTableList({ data, isOpen, setOpen, handleSelect, setCreateNewDialog }) {

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
                <TableHead colSpan={5} className="p-2 " >
                    <div className="flex flex-row justify-between">
                        <SearchBar />
                        <Button
                            variant="filter"
                            size="icon"
                            className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                            <FilterIcons fill="#CC0019" />
                        </Button>
                        <Button
                            onClick={() => setCreateNewDialog(true)}
                            variant="filter"
                            size="icon"
                            className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                            <Plus fill="#CC0019" />
                        </Button>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[40px] p-0 h-7 px-3 py-3">
                    <Checkbox />
                </TableHead>
                <TableHead className="p-0 h-7 px-3 py-3">ID</TableHead>
                <TableHead className="p-0 h-7 px-3 py-3">Row</TableHead>
                <TableHead className="p-0 h-7 px-3 py-3">Section</TableHead>
                <TableHead className="p-0 h-7 px-3 py-3">Level</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow
                                key={item.id}
                                className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"}`}
                                onClick={() => handleSelect(item.id)} >
                                <TableCell className="p-0 h-7 px-3 py-3 "> <Checkbox /></TableCell>
                                <TableCell className="p-0 h-7 px-3 py-3 ">{item.id}</TableCell>
                                <TableCell className="p-0 h-7 px-3 py-3 ">{item.Row}</TableCell>
                                <TableCell className="p-0 h-7 px-3 py-3 ">{item.Section}</TableCell>
                                <TableCell className="p-0 h-7 px-3 py-3 ">{item.Level}</TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
