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
                <TableHead colSpan={8} className="p-4 " >
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
                <TableHead className="w-[60px] text-center">
                    <Checkbox className="w-4 h-4" />
                </TableHead>
                <TableHead className="w-[200px] text-center">Order ID</TableHead>
                <TableHead className="w-[200px] ">Date</TableHead>
                <TableHead className="w-[200px] ">Unit ID</TableHead>
                <TableHead className="w-[200px] ">Customer</TableHead>
                <TableHead className="w-[200px] ">Order Total</TableHead>
                <TableHead className="w-[200px] ">Status</TableHead>
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
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.OrderID}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Date}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.UnitID}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Customer}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.OrderTotal}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Status}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-6 px-2"
                                        >
                                            <p className="text-xs">Complete</p>
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm w-6 h-6`}
                                        >
                                            <MoreHorizontalIcon />
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm  w-6 h-6`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <ArrowDownV2Icons
                                                className={`w-5 h-5 text-myBlue outline-myBlue fill-myBlue ${expandedRows[index] ? 'rotate-180' : ''}`}
                                            />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {expandedRows[index] && (
                                <>
                                    <TableRow >
                                        <TableCell colSpan={8} className="w-full p-1 py-[10px] bg-blue-100">
                                            <div className="w-full  px-[20px]">
                                                <Table>
                                                    <TableHeader className="text-sm">
                                                        <TableHead className="w-[200px] text-center h-10 text-xs">No</TableHead>
                                                        <TableHead className="h-10 text-xs ">Product</TableHead>
                                                        <TableHead className="h-10 text-xs ">Qty</TableHead>
                                                        <TableHead className=" h-10 text-xs">Unit Price</TableHead>
                                                        <TableHead className="h-10 text-xs ">Line Total</TableHead>
                                                        <TableHead className="w-[50px] h-10 text-xs">Fee</TableHead>
                                                        <TableHead className="w-[50px] h-10 text-xs">
                                                            <Checkbox />
                                                        </TableHead>

                                                    </TableHeader>
                                                    <TableBody className="text-xs bg-white p-0">
                                                        <TableRow>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                #1
                                                            </TableCell>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                TechNova Smartwatch
                                                            </TableCell>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                1
                                                            </TableCell>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                $120.00
                                                            </TableCell>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                $120.00
                                                            </TableCell>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                $2.30
                                                            </TableCell>
                                                            <TableCell className="h-10 p-0 py-4 px-3">
                                                                <Checkbox />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className="h-5 p-0">
                                                            <TableCell colSpan={5} className="h-5 p-0 px-5">
                                                                https://www.tokopedia.com/products/smartwatch-xyz789
                                                            </TableCell>
                                                            <TableCell className="h-5 p-0">
                                                                <Button
                                                                    variant="tableBlue"
                                                                    size="sm"
                                                                    className="w-full h-[20px] py-4 rounded-none"
                                                                >
                                                                    <p>Copy</p>
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell className="h-5 p-0" >
                                                                <Button
                                                                    variant="tableBlue"
                                                                    size="sm"
                                                                    className="w-full h-[20px] py-4 rounded-none"
                                                                >
                                                                    <p>Open</p>
                                                                </Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
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
