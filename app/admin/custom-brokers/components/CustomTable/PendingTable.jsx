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
import { DropdownPendingList } from "../dropdown/DropdownPendingList";
export function PendingTable({ data, isOpen, setOpen }) {

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isHeaderChecked, setIsHeaderChecked] = useState(false);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        const newExpandedRows = Array(data.length).fill(false);
        newExpandedRows[index] = true;
        setExpandedRows(newExpandedRows);
    };


    const toggleHeaderCheckbox = () => {
        setIsHeaderChecked(!isHeaderChecked);
    };

    const toggleItemCheckbox = (index) => {
        const newData = [...data];
        newData[index].isChecked = !newData[index].isChecked;
        setData(newData);
    };

    return (
        <>
            <div className="text-sm bg-white text-black">
                <div className="p-4 " >
                    <div className="flex flex-row justify-between">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                            <SearchBar />
                            <Button
                                variant="filter"
                                size="filter"
                                className='border border-zinc-300 flex items-center rounded'>
                                <FilterIcons
                                    className=""
                                    fill="#CC0019" />
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
                </div>
            </div>
            <Table className="border border-zinc-300 rounded-sm">

                <TableHeader className="text-xs h-[40px] py-[5px]">
                    <TableHead className="w-[50px]">
                        <Checkbox className="w-4 h-4" />
                    </TableHead>
                    <TableHead className="w-[200px] text-xs h-0 text-left">Tracking ID</TableHead>
                    <TableHead className="w-[200px] text-xs h-0 ">Customer Name</TableHead>
                    <TableHead className="w-[200px] text-xs h-0 ">Destination</TableHead>
                    <TableHead className="w-[200px] text-xs h-0 ">Update Date</TableHead>
                    <TableHead className="w-[200px] text-xs h-0 ">Customs Status</TableHead>
                    <TableHead className="w-[100px] text-xs h-0"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-100 hover:bg-blue-100"} h-50px`} >
                                    <TableCell className="font-medium w-[50px]">
                                        <Checkbox className="w-4 h-4" />
                                    </TableCell>
                                    <TableCell className="font-medium ">{item.TrackingID}</TableCell>
                                    <TableCell className="font-medium ">{item.CustomerName}</TableCell>
                                    <TableCell className="font-medium ">{item.Destination}</TableCell>
                                    <TableCell className="font-medium ">{item.UpdateDate}</TableCell>
                                    <TableCell className="font-medium ">{item.CustomsStatus}</TableCell>
                                    <TableCell className="w-[30px]  ">
                                        <div className="flex flex-row gap-2 ">
                                            <DropdownPendingList />
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={` w-max px-[5px] h-[25px]`}
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
                                            <TableCell colSpan={7} className="w-full p-1 px-[20px] py-[10px] bg-blue-50">
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
        </>
    )
}