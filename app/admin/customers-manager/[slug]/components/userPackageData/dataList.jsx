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
import { MoreHorizontalIcon } from "lucide-react";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";

export function CustomerPackageList({ data, isOpen, setOpen }) {

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
        <>
            <Table>
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
                    <TableHead className="w-[170px]">Package ID</TableHead>
                    <TableHead>Arrival Date</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Dimension</TableHead>
                    <TableHead className="">Current Status</TableHead>
                    <TableHead className="w-[30px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"}`} >
                                    <TableCell className="font-medium p-0 h-[35px] px-3">{item.PackageId}</TableCell>
                                    <TableCell className=" p-0 h-[35px] px-3">{item.ArrivalDate}</TableCell>
                                    <TableCell className=" p-0 h-[35px] px-3">{item.Destination}</TableCell>
                                    <TableCell className=" p-0 h-[35px] px-3">{item.Dimension}, {item.Weight}</TableCell>
                                    <TableCell className=" p-0 h-[35px] px-3">{item.CurrentStatus}</TableCell>
                                    <TableCell className="w-[35px] p-0 h-[35px] px-3">
                                        <div className="flex flex-row gap-2">
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={`rounded-sm w-max px-[10px] h-[20px]`}
                                                onClick={() => toggleOpenChange()}
                                            >
                                                <p className="text-[11px] text-myBlue">Update</p>
                                            </Button>

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
        </>
    )
}
