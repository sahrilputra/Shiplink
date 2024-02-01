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
                <TableHead className="w-[40px]">
                    <Checkbox />
                </TableHead>
                <TableHead className="">ID</TableHead>
                <TableHead>Row</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Level</TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow
                                key={item.id}
                                className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"}`}
                                onClick={() => handleSelect(item.id)} >
                                <TableCell className="font-medium"> <Checkbox /></TableCell>
                                <TableCell className="">{item.id}</TableCell>
                                <TableCell>{item.Row}</TableCell>
                                <TableCell>{item.Section}</TableCell>
                                <TableCell>{item.Level}</TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
