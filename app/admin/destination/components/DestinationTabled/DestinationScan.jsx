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
import { ExternalLink } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DestinationMenus } from "../menus/DestinationMenus";
import { SelectBins } from "./SelectBin";

export function DestinationTabled({ data, isOpen, setOpen, handleData, isSelected }) {

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

    const HandlerGetItemID = (id) => {
        handleData(id);
    }

    const toggleOpenChange = () => {
        setOpen(true)
    }
    return (
        <Table className="rounded-[6px]">
            <TableHeader className="text-sm bg-white rounded-[10px] text-black">
                <TableHead colSpan={7} className="p-4 text-black rounded-[6px]" >
                    <div className="flex flex-row justify-between">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center text-black">
                            <SearchBar />
                            <div className="h-[37px]  border-neutral-300 flex items-center  ">
                                <Input type="text" className="text-xs " />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                >
                                    <p className="text-xs">Scan Lots</p>
                                </Button>
                            </div>
                        </div>

                        <div className="h-[37px]  border-neutral-300 flex items-center  ">
                            <SelectBins />
                            <Button
                                variant="secondary"
                                size="sm"
                            >
                                <p className="text-xs">Assign To Bin</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[50px]">
                    <Checkbox
                        className="text-xs"
                        onChange={() => { }}
                    />
                </TableHead>
                <TableHead className="text-xs ">Lots ID</TableHead>
                <TableHead className="text-xs " >Register Date</TableHead>
                <TableHead className="text-xs ">Destination</TableHead>
                <TableHead className="text-xs w-[130px]">Bin Assign</TableHead>
                <TableHead className="text-xs w-[180px]">Current Status</TableHead>
                <TableHead className="text-xs "></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow
                                key={item.LotsID}
                                className={`cursor-pointer ${isSelected === item.LotsID ? "bg-blue-200 " : ""}`}
                                onClick={() => HandlerGetItemID(item.LotsID)}
                            >
                                <TableCell className=" w-[50px]">
                                    <Checkbox
                                        className="text-xs"
                                        onChange={() => { }}
                                    />
                                </TableCell>
                                <TableCell className=" font-medium ">{item.LotsID}</TableCell>
                                <TableCell className=" font-medium ">{item.RegisterDate}</TableCell>
                                <TableCell className=" font-medium ">{item.Destination}</TableCell>
                                <TableCell className=" font-medium ">{item.BinAssign}</TableCell>
                                <TableCell className=" font-medium ">{item.CurrentStatus}</TableCell>
                                <TableCell className=" w-[30px]  ">
                                    <div className="flex flex-row gap-2">
                                        <DestinationMenus dataID={item.index} />
                                    </div>
                                </TableCell>
                            </TableRow >
                        </>
                    ))
                }
            </TableBody>

        </Table >
    )
}
