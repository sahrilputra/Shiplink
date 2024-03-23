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
import NextLink from "next/link"
import { MoreHorizontalIcon } from "lucide-react";
import { addDays, format } from "date-fns";
export function AssignmetnsTabled({ data, isOpen, setOpen, selectedMenusState, selectedMenus, selectedIDHandler }) {

    const [expandedRows, setExpandedRows] = useState([]);
    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };
    const handleSetDate = (newDate) => {
        setDate({
            from: formatDate(newDate?.from || new Date()),
            to: formatDate(newDate?.to || new Date()),
        });
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
                            <DatePickerWithRange className={"text-black"} mySetdate={handleSetDate} />
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-xs">
                <TableHead className="">ID</TableHead>
                <TableHead className="">Number Type</TableHead>
                <TableHead className="">Number</TableHead>
                <TableHead className="">Assigned</TableHead>
                <TableHead className="">Action</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={` `} >
                                <TableCell className="font-medium ">{item.id}</TableCell>
                                <TableCell className="font-medium ">{item.Type}</TableCell>
                                <TableCell className="font-medium ">{item.SequencesRange}</TableCell>
                                <TableCell className="font-medium ">{item.AssignedTo}</TableCell>
                                <TableCell className="w-[30px]  ">
                                    <div className="flex flex-row gap-2">
                                        <NextLink href={"/admin/package-details/2"} >
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={`rounded-sm w-max px-[5px] h-[25px]`}
                                                onClick={() => toggleRow(index)}
                                            >
                                                <p className="text-[11px]">View Package</p>
                                            </Button>
                                        </NextLink>
                                        <MenuDropdown getSelectedItem={selectedMenusState} dataId={item} dataIDhandler={selectedIDHandler} key={item.id} />
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
