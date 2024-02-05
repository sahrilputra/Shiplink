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
import NextLink from "next/link";
import { WarehouseMenus } from "../menus/WarehouseMenus";

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
        <>

            <div className="text-sm bg-white text-black pb-3">
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
            </div>
            <Table className="border border-zinc-300 rounded-sm">

                <TableHeader className="text-xs">
                    <TableHead className="w-[50px] px-2 text-center">
                        <Checkbox className="w-4 h-4" />
                    </TableHead>
                    <TableHead className="text-xs w-[200px]">ID</TableHead>
                    <TableHead className="text-xs w-[200px] ">Name</TableHead>
                    <TableHead className="text-xs  ">Address</TableHead>
                    <TableHead className="text-xs w-[200px] ">Phone</TableHead>
                    <TableHead className="text-xs w-[200px] ">Email</TableHead>
                    <TableHead className="text-xs w-[100px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow key={item?.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} `} >
                                    <TableCell className="font-medium w-[50px]">
                                        <Checkbox className="w-4 h-4" />
                                    </TableCell>
                                    <TableCell className="font-medium ">{item?.id}</TableCell>
                                    <TableCell className="font-medium ">{item?.Name}</TableCell>
                                    <TableCell className="font-medium ">{item?.Address}</TableCell>
                                    <TableCell className="font-medium ">{item?.Phone}</TableCell>
                                    <TableCell className="font-medium ">{item?.Email}</TableCell>
                                    <TableCell className="w-[30px]  ">
                                        <div className="flex flex-row gap-2">
                                            <NextLink href={"/admin/warehouse-manager/1"}>
                                                <Button
                                                    variant="tableBlue"
                                                    size="sm"
                                                    className="h-6 px-3"
                                                >
                                                    <p className="text-xs">Details</p>
                                                </Button>
                                            </NextLink>
                                            <WarehouseMenus />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))
                    }
                </TableBody>

            </Table>
        </>
    )
}
