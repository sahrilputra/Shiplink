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
import { CustomBrokerDropdownMenus } from "../Menus/DropdownMenus";
export function CustomClearanceTable({ data, isOpen, setOpen }) {

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
                <TableHead className="w-[100px]">Lots ID</TableHead>
                <TableHead>Lots Labels</TableHead>
                <TableHead>Manifest Number</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="">Current Status</TableHead>
                <TableHead className="w-[30px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"}`} >
                                <TableCell className="font-medium">{item.LotsID}</TableCell>
                                <TableCell>{item.LotsLabels}</TableCell>
                                <TableCell>{item.ManifestNumber}</TableCell>
                                <TableCell>{item.Destination}</TableCell>
                                <TableCell className="">{item.CurrentStatus}</TableCell>
                                <TableCell className="w-[30px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleOpenChange()}
                                        >
                                            <p className="text-[11px]">Update</p>
                                        </Button>
                                        <CustomBrokerDropdownMenus />
                                    </div>
                                </TableCell>
                            </TableRow>
                            {/* {expandedRows[index] && (
                                <>
                                    <TableRow key={`expanded_${item.id}`} className="bg-blue-100 hover:bg-blue-100">
                                        <TableCell className="font-medium" colSpan={7}>
                                        </TableCell>
                                    </TableRow>

                                </>
                            )} */}
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
