'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { ExternalLink, MoreHorizontalIcon, Plus, Delete, ChevronsRightIcon, ChevronRight, ChevronLeft, ChevronsLeftIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import NextLink from 'next/link';
import { addDays, format } from "date-fns";
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
import { InvoiceMenus } from "./dialog/InvoiceMenus";
import { UpdateInvoiceStatus } from "./dialog/UpdateInvoiceStatus";
import { useTimeFormat } from "@/context/TimeFormatProvider";
import moment from "moment";
export function InvoiceTable({ isOpen, setOpen }) {
    const { timeFormat, dateFormat } = useTimeFormat();

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [invoiceID, setInvoiceID] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [invStatusID, setInvStatusID] = useState(false)
    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    const [query, setQuery] = useState({
        keyword: "",
        invoice_id: "",
        page: 1,
        limit: 10,
        index: 0
    });

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
        try {
            const response = await axios.post(
                `/api/admin/invoice/list`,
                {
                    ...query,
                    page: pagination.pageIndex + 1,
                    limit: pagination.pageSize,
                }
            );
            console.log(response)
            const data = await response.data;
            setData(data.invoice);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

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

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value,
            page: 1,
            limit: 10,
            index: 0,
        });
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });

        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    };


    const handleSetDate = (newDate) => {
        setDate({
            from: formatDate(newDate?.from || new Date()),
            to: formatDate(newDate?.to || new Date()),
        });
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
            cell: ({ row }) => {
                return (
                    <p
                        className="text-xs"
                        style={{ fontFamily: 'roboto' }}
                    >
                        {row.original.invoice_id}
                    </p>
                )
            },
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => {
                return (
                    <p
                        className="text-xs"
                        style={{ fontFamily: 'roboto' }}
                    >
                        {moment(row.original.date).format(`${dateFormat}`)}
                    </p>
                )
            },
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
            cell: ({ row }) => {
                return (
                    <p
                        className="text-xs"
                        style={{ fontFamily: 'roboto' }}
                    >
                        {`$ ${row.original.total}`}
                    </p>
                )
            },
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
                        <NextLink href={`/view/invoice/${row.original.invoice_id}`} passHref target="_blank">
                            <Button
                                variant="secondary"
                                className=" px-[5px] h-[25px] text-[11px] flex flex-row justify-center gap-1 items-center">
                                <p>View</p>
                            </Button>
                        </NextLink>
                        <InvoiceMenus handler={handlerStatus} invID={row.original.invoice_id} />
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
        manualPagination: true,
        pageCount: rowTotalData.page_total,
        rowCount: rowTotalData.page_limit,
        onPaginationChange: setPagination,
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
            pagination,
            query,
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
                                    <DatePickerWithRange className={"text-black"} mySetdate={handleSetDate} />
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
                    <PaginationContent>


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
        </>
    )

}