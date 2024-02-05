'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { ExternalLink, MoreHorizontalIcon, Plus, Delete } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import NextLink from 'next/link';
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
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";



export function InvoiceTable({ data, isOpen, setOpen }) {

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
            accessorKey: "InvoiceId",
            header: "Inovice ID",
        },
        {
            accessorKey: "Date",
            header: "Date",
        },
        {
            accessorKey: "BilledTo",
            header: "Billed To",
        },
        {
            accessorKey: "CustomerEmail",
            header: "Customer Email",


        },
        {
            accessorKey: "Totals",
            header: "Total Due",
        },
        {
            accessorKey: "Status",
            header: "Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ value }) => {
                return (
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
                )
            },
        }
    ]


    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
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
        <>
            <div className="">
                <Table className=" rounded-md">
                    <TableHeader className="text-sm bg-white text-black rounded-md ">
                        <TableHead colSpan={9} className="p-4  border border-zinc-300 rounded-md" >
                            <div className="flex flex-row justify-between rounded-md">
                                <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
                                    <div className="relative">
                                        <Input type="text"
                                            placeholder="Search..."
                                            className="pr-8 pl-4 text-xs"
                                            value={(table.getColumn("InvoiceId")?.getFilterValue()) ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("InvoiceId")?.setFilterValue(event.target.value)
                                            }
                                        />
                                        <div className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 right-3 text-xs"  >
                                            <SearchIcon
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="filter"
                                        size="icon"
                                        className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                        <FilterIcons fill="#CC0019" />
                                    </Button>
                                    <DatePickerWithRange className={"text-black"} />
                                </div>
                                <div>

                                    {
                                        Object.keys(rowSelection).length === 0 ? (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="w-[100px]"
                                            >
                                                <p className=" text-xs">New Invoice</p>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="w-[100px]"
                                            >
                                                <p className=" text-xs">Delete</p>
                                            </Button>
                                        )
                                    }

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
                                            className={`${isLastHeader ? "w-[30px] " : ""} text-xs`}
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
                                        <TableCell key={cell.id} className={`${cell.isLast && "w-[30px]"} text-xs `}>
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
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4 w-full">
                <div className=" text-sm text-muted-foreground w-full">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="w-full flex justify-end">
                    <Pagination className={"justify-end"}>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        table.previousPage();
                                    }}
                                    disabled={!table.getCanPreviousPage()}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <div className="flex flex-row">
                                    {table.getPageOptions().map((page) => (
                                        <PaginationLink
                                            key={page}
                                            href="#"
                                            onClick={() => table.gotoPage(page)}
                                            isActive={table.getCanNextPage()}
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    ))}
                                </div>
                                {/* <PaginationLink
                                href="#"
                            >
                            1
                            </PaginationLink> */}
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        table.nextPage();
                                    }}
                                    disabled={!table.getCanNextPage()}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
                {/* <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div> */}
            </div>
        </>
    )
}

