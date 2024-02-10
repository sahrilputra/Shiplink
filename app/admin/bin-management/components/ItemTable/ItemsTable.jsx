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
import { ExternalLink, MoreHorizontalIcon, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import NextLink from 'next/link';
import { MovePackageDialog } from "../dialog/MovePackageDialog";

export function ItemTable({ data, isOpen, setOpen }) {

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openMoveDialog, setOpenMoveDialog] = useState(false);

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
            <MovePackageDialog open={openMoveDialog} setOpen={setOpenMoveDialog} />
            <Table>
                <TableHeader className="text-sm bg-transparent py-2">
                    <TableHead colSpan={5} className="px-2 py-3 " >
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
                            </div>
                            <div className="">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="px-[20px]"
                                    onClick={() => setOpenMoveDialog(true)}
                                >
                                    <p className=" text-xs">Move Package</p>
                                </Button>
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
                <TableHeader className="text-sm">
                    <TableHead className=" text-xs w-[50px]">
                        <Checkbox />
                    </TableHead>
                    <TableHead className=" text-xs ">ID</TableHead>
                    <TableHead className=" text-xs ">Customer</TableHead>
                    <TableHead className=" text-xs ">Date</TableHead>
                    <TableHead className=" text-xs w-[100px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <>
                                <TableRow
                                    key={item.PackageID} >
                                    <TableCell className="py-2 text-xs w-[50px]"> <Checkbox /></TableCell>
                                    <TableCell className="py-2 text-xs ">{item.PackageID}</TableCell>
                                    <TableCell className="py-2 text-xs ">{item.Customer}</TableCell>
                                    <TableCell className="py-2 text-xs ">{item.Date}</TableCell>
                                    <TableCell className="py-2 text-xs w-[100px]">
                                        <div className="flex flex-row gap-2">
                                            <NextLink
                                                href={"/admin/package-details/2"}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                                    <p>Details</p>
                                                    <ExternalLink width={10} height={10} />
                                                </Button>
                                            </NextLink>
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={`w-max px-[10px] h-[25px]`}
                                                onClick={() => setOpenMoveDialog(true)}
                                            >
                                                <p className="text-[11px]">Move</p>
                                            </Button>
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
