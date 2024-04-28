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
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { FilterIcons } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DeleteIcons } from "@/components/icons/iconCollection";
import { MenuDropdown } from "../../assignments/components/menu/MenuDropdown";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import { useTimeFormat } from "@/context/TimeFormatProvider";
import moment from 'moment';
import Link from 'next/link';

export function AssignmetnsTabled({ }) {

    const { dateFormat, timeFormat } = useTimeFormat();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        index: 0,
        sort_by: "",
        sort_type: "",
    })
    const [isSkeleton, setIsSkeleton] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowTotalData, setRowTotalData] = useState({
        page_limit: 0,
        page_total: 0,
        total: 0
    })

    const fetchData = async () => {
        setIsSkeleton(true);
        try {
            const response = await axios.post(
                `/api/admin/Pars/list_assignment`,
                query
            )
            console.log("🚀 ~ fetchData ~ response:", response)
            const responseData = await response.data;
            setRowTotalData({
                page_limit: responseData.page_limit,
                page_total: responseData.page_total,
                total: responseData.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: responseData.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setData(responseData.assigment)
            setIsSkeleton(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [query])

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


    const columns = [
        {
            accessorKey: "id",
            header: "#",
            className: "text-xs",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto', }}
                        className='uppercase'>{`${row.original.id}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                return (
                    <div
                        className="uppercase "
                    >
                        {row.original.type}
                    </div>
                )
            }
        },
        {
            accessorKey: "code_number",
            header: "Code Number",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.code_number}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "tracking_id",
            header: "Tracking ID",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto', }}
                        className='uppercase'>{`${row.original.tracking_id}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Package Status",

        },
        {
            accessorKey: "date_created",

            header: "Create Date",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>
                        {moment(row.original.date_created).format(`${dateFormat}, ${timeFormat}`)}
                    </span>
                )
            }
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Link
                            passHref
                            href={`/admin/package-details/${row.original.tracking_id}`}
                        >
                            <Button
                                variant="tableBlue"
                                size="sm"
                                className="h-6 px-2"
                            >
                                <p className="text-xs">View Package</p>
                            </Button>
                        </Link>

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
            pagination,
            query,
        },
        defaultColumn: {
            size: "auto"
        }

    })

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };

    return (
        <div className="text-sm bg-white text-black border border-zinc-300 rounded-md">
            <div className="p-4  " >
                <div className="flex flex-row justify-between rounded-md">
                    <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
                        <SearchBar handleSearch={handleSearchChange} />
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
                        {/* <Button
                            variant="destructive"
                            size="xs"
                            className="w-[100px]"
                            onClick={() => handlerDelete(selectedRowID)}
                            disabled={Object.keys(rowSelection).length === 0} // Check if any item is checked
                        >
                            <p className=" text-xs">Delete</p>
                        </Button> */}
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
            <div className="flex justify-between w-full items-end mt-2 mb-2 p-4">
                <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">
                    {/* <strong>
                        {table.getFilteredSelectedRowModel().rows.length}
                    </strong>
                    of{" "}
                    <div className="flex flex-row gap-1">
                        <strong>
                            {table.getFilteredRowModel().rows.length}
                        </strong>
                        <p className="text-nowrap"> row(s) selected.</p>
                    </div> */}
                </div>
                <Pagination className={'flex justify-end w-full items-end gap-2'}>
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
        </div>
    )
}
