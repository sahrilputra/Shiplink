'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { ExternalLink, MoreHorizontalIcon, Plus, Delete } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import NextLink from 'next/link';
import { DeleteInvoiceDialog } from "./dialog/DeleteInvoiceDialog";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
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
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios'

export function InvoiceTable({ isOpen, setOpen }) {

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [invoiceID, setInvoiceID] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/invoice/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setData(data.invoice);
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

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
            accessorKey: "invoice_id",
            header: "Inovice ID",
        },
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "billed_name",
            header: "Billed To",
        },
        {
            accessorKey: "email",
            header: "Customer Email",


        },
        {
            accessorKey: "total",
            header: "Total Due",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <NextLink href={`/view/invoice/${row.original.invoice_id}`}>
                            <Button
                                variant="secondary"
                                className=" px-[5px] h-[25px] text-[11px] flex flex-row justify-center gap-1 items-center">
                                <p>View</p>
                            </Button>
                        </NextLink>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>

                        <Button
                            variant="tableBlue"
                            className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center"
                            onClick={() => handlerDelete(row.original.invoice_id)}
                        >
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
    const handlerDelete = (data) => {
        setOpenDelete(true)
        setInvoiceID(Array.isArray(data) ? data : [data]);
    }
    const reloadData = async () => {
        try {
            await fetchData();
            setRowSelection({}); // Menetapkan kembali objek rowSelection menjadi kosong
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handlerSearch = (e) => {
        setQuery({ ...query, keyword: e.target.value })
    }
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original.invoice_id);
    return (
        <>
            <DeleteInvoiceDialog open={openDelete} setOpen={setOpenDelete} deleteID={invoiceID} reloadData={reloadData} />
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
                                            value={(table.getColumn("invoice_id")?.getFilterValue()) ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("invoice_id")?.setFilterValue(event.target.value)
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
                                        size="filter"
                                        className='border border-zinc-300 flex items-center rounded'>
                                        <FilterIcons
                                            className=""
                                            fill="#CC0019" />
                                    </Button>
                                    <DatePickerWithRange className={"text-black"} />
                                </div>
                                <div>

                                    {
                                        Object.keys(rowSelection).length === 0 ? (
                                            <NextLink href={"/admin/invoice-manager/invoice"} >
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="w-[100px]"
                                                >
                                                    <p className=" text-xs">New Invoice</p>
                                                </Button>
                                            </NextLink>
                                        ) : (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="w-[100px]"
                                                onClick={() => handlerDelete(selectedRows)}
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
                        {isSkeleton || !table.getRowModel().rows?.length ? (
                            <>
                                {isSkeleton &&
                                    [...Array(table.getRowModel().rows?.length || 5)].map((_, index) => (
                                        <TableRow key={index}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                    key={columnIndex}
                                                    className={`${columnIndex === columns.length - 1 ? "w-[30px]" : columnIndex === 0 ? "w-[50px]" : ""} text-xs`}
                                                >
                                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}

                                {!isSkeleton && !table.getRowModel().rows?.length && (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ) : (
                            // Jika data telah dimuat, render data aktual
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs `}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
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
                                            className={"gap-1 px-2 py-1 h-[30px] text-xs"}
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