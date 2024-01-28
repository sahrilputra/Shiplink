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
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,

} from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export function PARSTable({ data, isOpen, setOpen, }) {


    const columns = [
        {
            accessorKey: "select",
            id: "select",
            header: ({ table }) => {
                return (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                )
            },
            cell: ({ row }) => {
                return (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                )
            },
        },
        {
            accessorKey: "SequencesRange",
            header: "PARS / PAPS Number",
        },
        {
            accessorKey: "CreateDate",
            header: "Create Date",
        },
        {
            accessorKey: "AssignedTo",
            header: "Assigned To",
        },
        {
            accessorKey: "EditDate",
            header: "Edit Date",


        },
        {
            // accessorKey: "Action",
            id: "Action",
            header: "Action",
            cell: ({ value }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => toggleRow(index)}
                        >
                            <p className="text-[11px]">Update</p>
                        </Button>
                        <Button
                            variant="tableBlue"
                            size="icon"
                            className={` rounded-sm  w-6 h-6`}
                            onClick={() => toggleRow(index)}
                        >
                            <DeleteIcons className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  w-4 h-4`} />
                        </Button>
                        <Button
                            variant="tableBlue"
                            size="icon"
                            className={` rounded-sm w-6 h-6`}
                            onClick={() => toggleRow(index)}
                        >
                            <MoreHorizontalIcon />
                        </Button>
                    </div>
                )
            },
        }
    ]


    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },

    })


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
                {table.getHeaderGroups().map((headerGroup) => (
                    <>
                        {headerGroup.headers.map((header, index) => {
                            const isLastHeader = index === headerGroup.headers.length - 1;
                            return (
                                <TableHead
                                    key={header.id}
                                    className={`${isLastHeader ? "w-[30px]" : ""}`}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}

                                    {console.log(header.column.columnDef.header)}
                                </TableHead>
                            );
                        })}
                    </>
                ))}
                {/* <TableHead className="w-[60px]"></TableHead>
                <TableHead>PARS / PAPS Number</TableHead>
                <TableHead>Create Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="">Edit Date</TableHead>
                <TableHead className="">Action</TableHead> */}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={row.isLast && "w-[30px]"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className={cell.isLast && "w-[30px]"}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {/* <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`h-[50px] `} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px] w-[50px]">
                                    <Checkbox className="w-4 h-4" />
                                </TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.SequencesRange}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CreateDate}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.AssignedTo}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.EditDate}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="tableBlue"
                                            size="tableIcon"
                                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <p className="text-[11px]">Update</p>
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm  w-6 h-6`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <DeleteIcons className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  w-4 h-4`} />
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm w-6 h-6`}
                                            onClick={() => toggleRow(index)}
                                        >
                                            <MoreHorizontalIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody> */}

        </Table>
    )
}
