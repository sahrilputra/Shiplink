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
import { BrokerDeclareContent } from "./BrokerDeclareContent";
export function PendingTable({ data, isOpen, setOpen }) {

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
                                size="icon"
                                className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                <FilterIcons fill="#CC0019" />
                            </Button>
                            <DatePickerWithRange className={"text-black"} />
                        </div>
                        <div className="">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-[100px]"
                            >
                                <p className=" text-xs">Print</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[60px] text-center">
                    <Checkbox className="w-4 h-4" />
                </TableHead>
                <TableHead className="w-[200px] text-center">Tracking ID</TableHead>
                <TableHead className="w-[200px] ">Customer Name</TableHead>
                <TableHead className="w-[200px] ">Destination</TableHead>
                <TableHead className="w-[200px] ">Update Date</TableHead>
                <TableHead className="w-[200px] ">Customs Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-50px`} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px] w-[50px]">
                                    <Checkbox className="w-4 h-4" />
                                </TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.TrackingID}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CustomerName}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Destination}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.UpdateDate}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CustomsStatus}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleOpenChange()}
                                        >
                                            <MoreHorizontalIcon width={15} height={15} />
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <ArrowDownV2Icons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[index] ? 'rotate-180' : ''}`} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {expandedRows[index] && (
                                <>
                                    <TableRow >
                                        <TableCell colSpan={7} className="w-full p-1 px-[20px] py-[10px] bg-blue-100">
                                            <BrokerDeclareContent />
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}

                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
