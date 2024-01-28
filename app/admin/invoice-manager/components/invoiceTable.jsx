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
import { ExternalLink, MoreHorizontalIcon, Plus, Delete } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
export function InvoiceTable({ data, isOpen, setOpen }) {

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
            <TableHeader className="text-sm bg-transparent py-2">
                <TableHead colSpan={8} className="p-2 " >
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
                                className="px-10"
                                onClick={() => toggleOpenChange()}
                            >
                                <p className=" text-xs">New Invoice</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                <TableHead className="w-[40px]">
                    <Checkbox />
                </TableHead>
                <TableHead className="">Inovice Id</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Billed To</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead>Total Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                <TableRow>
                    <TableCell>
                        <Checkbox />
                    </TableCell>
                    <TableCell>
                        123456
                    </TableCell>
                    <TableCell>
                        12/12/2021
                    </TableCell>
                    <TableCell>
                        John Doe
                    </TableCell>
                    <TableCell>
                        JohnDoe@gmail.com
                    </TableCell>
                    <TableCell>
                        $ 12.23
                    </TableCell>
                    <TableCell>
                        Paid
                    </TableCell>
                    <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                        <div className="flex flex-row gap-2">
                            <Button
                                variant="secondary"
                                className=" px-[5px] h-[25px] text-[11px] flex flex-row justify-center gap-1 items-center">
                                <p>View</p>
                            </Button>
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
                                className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                <Delete width={15} height={15} />
                            </Button>

                        </div>
                    </TableCell>
                </TableRow>
                {/* {
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
                                    </div>
                                </TableCell>
                            </TableRow>
                        </>
                    ))
                } */}
            </TableBody>

        </Table>
    )
}
