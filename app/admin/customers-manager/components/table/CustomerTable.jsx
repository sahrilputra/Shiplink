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
import NextLink from "next/link";
import { CustomerManagerDropDown } from "../menus/CustomerManagerMenus";
export function CustomerTable({ data, open, setOpen }) {

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);


    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }

    const toggleOpenDialog = () => {
        setOpen(!open)
    }
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };

    return (
        <>
            <div className="text-sm bg-white text-black pb-[10px]">
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
                            className="px-5"
                            onClick={() => toggleOpenDialog()}
                        >
                            <p className=" text-xs">Create New Customer</p>
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="border border-zinc-300 rounded-sm">

                <TableHeader className="text-sm">
                    <TableHead className="text-xs ">Unit ID</TableHead>
                    <TableHead className="text-xs ">Customer Name</TableHead>
                    <TableHead className="text-xs ">Date Created</TableHead>
                    <TableHead className="text-xs ">Last Login</TableHead>
                    <TableHead className="text-xs ">Membership</TableHead>
                    <TableHead className="text-xs w-[100px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-50px`} >

                                    <TableCell className="font-medium ">{item.UnitId}</TableCell>
                                    <TableCell className="font-medium ">{item.CustomerName}</TableCell>
                                    <TableCell className="font-medium ">{item.DateCreated}</TableCell>
                                    <TableCell className="font-medium ">{item.LastLogin}</TableCell>
                                    <TableCell className="font-medium ">{item.Membership}</TableCell>
                                    <TableCell className=" w-[100px] ">
                                        <div className="flex flex-row gap-2">
                                            <NextLink
                                                className="focus:outline-none focus:ring-0 focus:border-transparent"
                                                href={"/admin/customers-manager/1"}>
                                                <Button
                                                    variant="tableBlue"
                                                    size="tableIcon"
                                                    className={`rounded-sm w-max px-[10px] h-[20px]`}
                                                    onClick={() => toggleOpenChange()}
                                                >
                                                    <p className="text-[11px] text-myBlue">Details</p>
                                                </Button>
                                            </NextLink>
                                            <CustomerManagerDropDown />
                                        </div>
                                    </TableCell>
                                </TableRow>


                            </>
                        ))
                    }
                </TableBody>

            </Table>
        </>
    )
}
