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
import { MenuDropdown } from "../../assignments/components/menu/MenuDropdown";
import { MoreHorizontalIcon } from "lucide-react";

export function AssignmetnsTabled({ data, isOpen, setOpen, selectedMenusState, selectedMenus, selectedIDHandler }) {

    const [expandedRows, setExpandedRows] = useState([]);

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
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead>ID</TableHead>
                <TableHead>Number Type</TableHead>
                <TableHead>Number</TableHead>
                <TableHead className="">Assigned</TableHead>
                <TableHead className="">Action</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`h-[50px] `} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.id}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Type}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.SequencesRange}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.AssignedTo}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <p className="text-[11px]">View Package</p>
                                        </Button>
                                        <MenuDropdown getSelectedItem={selectedMenusState} dataId={item.id} dataIDhandler={selectedIDHandler} key={item.id} />
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
