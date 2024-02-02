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
export function EventTabled({ data, isOpen, setOpen }) {

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
            <TableHeader className="text-sm">
                <TableHead className=" ">Tracking ID</TableHead>
                <TableHead className=" ">Date</TableHead>
                <TableHead className=" ">Time</TableHead>
                <TableHead className=" ">Event Description</TableHead>
                <TableHead className=" ">Location</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item?.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-50px`} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.TrackingID}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Date}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Time}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.EventDescription}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item?.Location}</TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
