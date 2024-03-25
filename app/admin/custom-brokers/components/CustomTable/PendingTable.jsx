'use client'
'use client'
import React, { useEffect, useState } from "react";
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
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon } from "lucide-react";
import NextLink from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { DropdownPendingList } from "../dropdown/DropdownPendingList";
import { BrokerDeclareContent } from "./BrokerDeclareContent";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function PendingTable({ data, isSkeleton, handleSearchChange, reload, setQuery, query, status, pagination, setPagination, rowTotalData, setRowTotalData }) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});
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
            accessorKey: "tracking_id",
            header: () => {
                return (
                    <div
                        className="cursor-pointer select-none"
                        onClick={() => {
                            setSorting([{ id: "tracking_id", desc: !isSortedDesc }]);
                            setIsSortedDesc(!isSortedDesc);
                        }}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            Tracking ID
                            <>
                                {isSortedDesc ? <ChevronDown fill="#fffff" width={15} /> : <ChevronUp fill="#fffff" width={15} />}
                            </>
                        </div>

                    </div>
                );
            },
            className: "text-xs",
        },
        {
            accessorKey: "customer_name",
            header: () => {
                return (
                    <div
                        className="cursor-pointer select-none"
                        onClick={() => {
                            setSorting([{ id: "tracking_id", desc: !isSortedDesc }]);
                            setIsSortedDesc(!isSortedDesc);
                        }}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            Customer Name
                            <>
                                {isSortedDesc ? <ChevronDown fill="#fffff" width={15} /> : <ChevronUp fill="#fffff" width={15} />}
                            </>
                        </div>

                    </div>
                );
            },
        },
        {
            accessorKey: "address",
            header: "Destination",
        },
        {
            accessorKey: "updated_at",
            header: "Update Date",
        },
        {
            accessorKey: "status",
            header: "Customs Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="w-[60px]" key={row}>
                        <div className="flex flex-row gap-2 ">
                            <DropdownPendingList data={row.original} />
                            <Button
                                onClick={() => toggleRow(row.id)}
                                variant="tableBlue"
                                size="tableIcon"
                                className={` w-max px-[5px] h-[25px]`}
                            >
                                <ArrowDownV2Icons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue  ${expandedRows[row.id] ? 'rotate-180' : ''}`} />
                            </Button>
                        </div>
                    </div>
                )
            },
        }
    ]
    // ${expandedRows[index] ? 'rotate-180' : ''}

    const handlerPaginationChange = (page) => {
        if (page >= 0) {
            console.log("🚀 ~ handlerPaginationChange ~ page:", page);
            setPagination(prevPagination => ({
                ...prevPagination,
                pageIndex: page,
            }));
            setQuery(prevQuery => ({
                ...prevQuery,
                page: page,
                index: page * prevQuery.limit
            }));
        }
    };


    const table = useReactTable({
        data: data,
        columns,
        manualPagination: true,
        pageCount: rowTotalData.page_total,
        rowCount: rowTotalData.page_limit,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
            sorting,
            rowSelection,
            pagination,
            query,
        },
    });

    console.log("ROW Select Model: ", table.getSelectedRowModel().rows.map(row => row.original.warehouse_id));
    const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.warehouse_id);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        const newExpandedRows = {};
        if (expandedRows[index]) {
            setExpandedRows({});
        } else {
            newExpandedRows[index] = true;
            setExpandedRows(newExpandedRows);
        }
    };
    const handlerDelete = (item) => {
        setDeleteId(item)
        setDeleteDialog(true)
    }

    const handlePageChange = (pageNumber) => {
        setQuery({ ...query, page: pageNumber });
    };


    return (
        <>
            <div className="text-sm bg-white text-black pb-3">
                <div className="flex flex-row justify-between">
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="pr-8 pl-2 text-xs border border-zinc-300"
                                onChange={handleSearchChange}

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
                    </div>

                </div>
            </div>
            <Table className=" rounded-md">
                <TableHeader className="text-sm">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <>
                            {headerGroup.headers.map((header, index) => {
                                const isLastHeader = index === headerGroup.headers.length - 1;
                                const isFirstHeader = index === 0;
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={`${isLastHeader ? "w-[30px] " : isFirstHeader ? "w-[50px]" : ""} text-xs`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
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
                        table.getRowModel().rows.map((row) => (
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={row.isLast ? "w-[60px]" : row.isFirst ? "w-[50px]" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[60px]" : cell.isFirst ? "w-[50px]" : ""} text-xs  ${expandedRows[row.id] && "bg-blue-100 hover:bg-blue-100"}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {expandedRows[row.id] && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="w-full p-1 px-[20px] py-[10px] bg-blue-50">
                                            <BrokerDeclareContent data={row.original.content} details={row.original} TrackingID={row.original.tracking_id} reload={reload} status={row.original.status} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between w-full items-center mt-3 pb-2">
                <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">
                    <strong>
                        {table.getFilteredSelectedRowModel().rows.length}
                    </strong>
                    of{" "}
                    <div className="flex flex-row gap-1">
                        <strong>
                            {table.getFilteredRowModel().rows.length}
                        </strong>
                        <p className="text-nowrap"> row(s) selected.</p>
                    </div>
                </div>
                <Pagination className={'flex justify-end w-full items-center gap-2'}>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </div>
                    <Button
                        variant={`redOutline`}
                        onClick={() => handlerPaginationChange(0)}
                        className="px-1 py-1 h-[30px] w-[30px] text-xs"
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeftIcon className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={`destructive`}
                        className="px-2 py-2 h-[30px] w-[30px] text-xs"
                        onClick={() => handlerPaginationChange(pagination.pageIndex - 1)} // Menggunakan handlerPaginationChange untuk mengatur halaman pertama
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={`destructive`}
                        className="px-2 py-2 h-[30px] w-[30px] text-xs"
                        onClick={() => handlerPaginationChange(pagination.pageIndex + 1)} // Menggunakan handlerPaginationChange untuk mengatur halaman berikutnya
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={`redOutline`}
                        className="px-1 py-1 h-[30px] w-[30px] text-xs"
                        onClick={() => handlerPaginationChange(table.getPageCount() - 1)} // Menggunakan handlerPaginationChange untuk mengatur halaman terakhir
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRightIcon className="h-4 w-4" />
                    </Button>
                </Pagination>
            </div>
        </>
    )
}



