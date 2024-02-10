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
import { AssistedPurchaseMenus } from "../menus/AssistedPurchaseMenus";
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
        const newExpandedRows = Array(data.length).fill(false);
        newExpandedRows[index] = true;
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
                                size="filter"
                                className='border border-zinc-300 flex items-center rounded'>
                                <FilterIcons
                                    className=""
                                    fill="#CC0019" />
                            </Button>
                            <DatePickerWithRange className={"text-black"} />
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[60px] text-xs">
                    <Checkbox className="w-4 h-4" />
                </TableHead>
                <TableHead className="w-[200px] text-xs ">Order ID</TableHead>
                <TableHead className="w-[200px] text-xs ">Date</TableHead>
                <TableHead className="w-[200px] text-xs ">Unit ID</TableHead>
                <TableHead className="w-[200px] text-xs ">Customer</TableHead>
                <TableHead className="w-[200px] text-xs ">Order Total</TableHead>
                <TableHead className="w-[200px] text-xs ">Status</TableHead>
                <TableHead className="w-[100px] text-xs"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-100 hover:bg-blue-100"}`} >
                                <TableCell className="font-medium ">
                                    <Checkbox className="w-4 h-4" />
                                </TableCell>
                                <TableCell className="font-medium  ">{item.OrderID}</TableCell>
                                <TableCell className="font-medium  ">{item.Date}</TableCell>
                                <TableCell className="font-medium  ">{item.UnitID}</TableCell>
                                <TableCell className="font-medium  ">{item.Customer}</TableCell>
                                <TableCell className="font-medium  ">{item.OrderTotal}</TableCell>
                                <TableCell className="font-medium  ">{item.Status}</TableCell>
                                <TableCell className="w-[30px]   ">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-6 px-2"
                                        >
                                            <p className="text-xs">Complete</p>
                                        </Button>
                                        <AssistedPurchaseMenus />
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={`rounded-[3px] w-6 h-6`}
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
                                        <TableCell colSpan={8} className="w-full p-1 py-[10px] bg-blue-50">
                                            <div className="w-full  px-[20px]">
                                                <Table>
                                                    <TableHeader className="text-sm bg-blue-100 text-myBlue">
                                                        <TableHead className="text-myBlue w-[200px] text-center  text-xs">No</TableHead>
                                                        <TableHead className="text-myBlue  text-xs ">Product</TableHead>
                                                        <TableHead className="text-myBlue  text-xs ">Qty</TableHead>
                                                        <TableHead className="text-myBlue   text-xs">Unit Price</TableHead>
                                                        <TableHead className="text-myBlue  text-xs ">Line Total</TableHead>
                                                        <TableHead className="text-myBlue w-[50px]  text-xs">Fee</TableHead>


                                                    </TableHeader>
                                                    <TableBody className="text-xs bg-white p-0">
                                                        <TableRow>
                                                            <TableCell className="h-8 px-5 py-2">
                                                                #1
                                                            </TableCell>
                                                            <TableCell className="h-8 px-5 py-2">
                                                                TechNova Smartwatch
                                                            </TableCell>
                                                            <TableCell className="h-8 px-5 py-2">
                                                                1
                                                            </TableCell>
                                                            <TableCell className="h-8 px-5 py-2">
                                                                $120.00
                                                            </TableCell>
                                                            <TableCell className="h-8 px-5 py-2">
                                                                $120.00
                                                            </TableCell>
                                                            <TableCell className="h-8 px-5 py-2">
                                                                $2.30
                                                            </TableCell>

                                                        </TableRow>
                                                        <TableRow className="h-5 p-0">
                                                            <TableCell colSpan={7} className="h-5 p-0 ">
                                                                <div className=" flex flex-row justify-between items-center">
                                                                    <div className="link w-full px-3 py-2">
                                                                        <p className=" text-xs text-myBlue underline">https://www.tokopedia.com/products/smartwatch-xyz789</p>
                                                                    </div>
                                                                    <div className="ButtonGrop flex flex-row items-center">
                                                                        <Button
                                                                            variant="tableBlue"
                                                                            size="xs"
                                                                            className="w-full rounded-none"
                                                                        >
                                                                            <p>Copy</p>
                                                                        </Button>
                                                                        <Button
                                                                            variant="tableBlue"
                                                                            size="xs"
                                                                            className="w-full rounded-none"
                                                                        >
                                                                            <p>Open</p>
                                                                        </Button>
                                                                    </div>
                                                                </div>
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
