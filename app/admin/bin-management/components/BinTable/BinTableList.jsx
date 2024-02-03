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
import { ArrowDownV2Icons } from "@/components/icons/iconCollection";
import { MoreHorizontalIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
export function BinTableList({ data, isOpen, setOpen, handleSelect }) {

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
