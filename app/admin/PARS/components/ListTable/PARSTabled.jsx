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
import { MoreHorizontalIcon, ChevronLeft, ChevronRight, ChevronsRightIcon, ChevronsLeftIcon } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios'
import { DeleteSequences } from "../dialog/DeleteSequences";
import { EditSelectedNumber } from "../dialog/EditSelectedNumber";

export function PARSTable({ isReload, setIsReload }) {

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [codeList, setCodeList] = useState([])
    const [deleteID, setDeleteID] = useState([]);
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [editID, setEditID] = useState(null)
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        index: 0,
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
        setIsSkeleton(true);
        try {
            const response = await axios.post(
                `/api/admin/Pars/list`,
                query
            );
            console.log("PARS RESPONSE", response)
            const data = await response.data;
            setCodeList(data.sequence);
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

    useEffect(() => {
        fetchData();
        if (isReload) {
            setIsReload(false)
        }
    }, [query, isReload]);

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
            accessorKey: "type",
            header: "PARS / PAPS Number",
            className: "text-xs",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto', }}
                        className='uppercase'>{`${row.original.type}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "sequence_range",
            header: "Code Range",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.sequence_range}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "carrier_code",
            header: "Carrier Code",
        },
        {
            accessorKey: "date_created",
            header: "Create Date",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.date_created}`}
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
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => handlerEdit(row.original)}
                        >
                            <p className="text-xs">Edit</p>
                        </Button>

                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max px-[5px] h-6`}
                            onClick={() => handlerDelete([row.original.id])}
                        >
                            <DeleteIcons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  `} />
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
        data: codeList,
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

    })

    const handlerDelete = (data) => {
        setOpenDelete(true)
        setDeleteID(data)
    }
    const handlerEdit = (data) => {
        setOpenEdit(true)
        setEditID(data)
    }

    const reloadData = async () => {
        try {
            await fetchData();
            setRowSelection({}); // Menetapkan kembali objek rowSelection menjadi kosong
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const selectedRowID = table.getSelectedRowModel().rows.map(row => row.original.id);
    return (
        <>
            <EditSelectedNumber open={openEdit} setOpen={setOpenEdit} data={editID} reload={reloadData} />
            <DeleteSequences open={openDelete} setOpen={setOpenDelete} deleteID={deleteID} reloadData={reloadData} />
            <div className="text-sm bg-white text-black border border-zinc-300 rounded-md">
                <div className="p-4  " >
                    <div className="flex flex-row justify-between rounded-md">
                        <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
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
                                className="w-[100px]"
                                onClick={() => handlerDelete(selectedRowID)}
                                disabled={Object.keys(rowSelection).length === 0} // Check if any item is checked
                            >
                                <p className=" text-xs">Delete</p>
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
                <div className="flex justify-between w-full items-end mt-1 pb-2">
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
                        <PaginationContent>


                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    )
}
