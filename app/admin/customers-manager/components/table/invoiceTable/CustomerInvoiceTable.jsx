'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { ExternalLink, MoreHorizontalIcon, Plus, Delete } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import NextLink from 'next/link';
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
import { UpdateInvoiceStatus } from "@/app/admin/invoice-manager/components/dialog/UpdateInvoiceStatus";
import { MenusInv } from "./MenusInv";
import { DeleteInvoiceDialog } from "@/app/admin/invoice-manager/components/dialog/DeleteInvoiceDialog";

export function CustomerInvoiceTable({ isOpen, setOpen, UserID }) {
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [invoiceID, setInvoiceID] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [invStatusID, setInvStatusID] = useState(false)
    const [query, setQuery] = useState({
        keyword: "",
        invoice_id: "",
        page: 1,
        limit: 0,
        index: 0
    });
    
    useEffect(() => {
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
        fetchData();
        setQuery({ ...query, keyword: UserID })
    }, [query, UserID]);

    const columns = [
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
                        <MenusInv handler={handlerStatus} invID={row.original.invoice_id} />
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

    const handlerStatus = (data) => {
        setOpenStatus(true)
        setInvStatusID(data)
    }

    const handlerSearch = (e) => {
        setQuery({ ...query, keyword: e.target.value })
    }
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original.invoice_id);
    return (
        <>
            <UpdateInvoiceStatus open={openStatus} setOpen={setOpenStatus} dataID={invStatusID} reload={reloadData} />
            <DeleteInvoiceDialog open={openDelete} setOpen={setOpenDelete} deleteID={invoiceID} reloadData={reloadData} />
            <div className="">
                <Table className=" rounded-md">
                    <TableHeader className="text-sm bg-white text-black rounded-md ">
                        <p className=" font-bold py-3 px-2">User Invoice</p>
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
                            {/* <PaginationItem>
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
                            </PaginationItem> */}
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