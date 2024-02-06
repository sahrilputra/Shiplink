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
import { MoreHorizontalIcon } from "lucide-react";


export function ProductListData({ data, isOpen, setOpen }) {

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
                <TableHead className="text-xs w-[200px]">ID</TableHead>
                <TableHead className="text-xs w-[200px] ">Item #</TableHead>
                <TableHead className="text-xs w-[400px]">Description</TableHead>
                <TableHead className="text-xs w-[200px]">Price</TableHead>
                <TableHead className="text-xs w-[100px]">Category</TableHead>
                <TableHead className="text-xs w-[50px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item?.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-50px`} >
                                <TableCell className="font-medium">{item?.id}</TableCell>
                                <TableCell className="font-medium">{item?.Item}</TableCell>
                                <TableCell className="font-medium">{item?.Description}</TableCell>
                                <TableCell className="font-medium">{item?.Price}</TableCell>
                                <TableCell className="font-medium">{item?.Category}</TableCell>
                                <TableCell className="w-[50px] ">
                                    <div className="flex flex-row gap-2">
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
