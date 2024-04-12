
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
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon } from "lucide-react";
import { CustomBrokerDropdownMenus } from "../Menus/DropdownMenus";
import { UpdateDialog } from "../Menus/UpdateDialog";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function CustomClearanceTable({ data }) {
    const [isEditDialog, setEditDialog] = useState(false);

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [lots, setLots] = useState([]);
    console.log("🚀 ~ CustomClearanceTable ~ lots:", lots)
    const [deleteID, setDeleteId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteMuchDialog, setDeleteMuchDialog] = useState(false);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [dataID, setDataID] = useState(null)

    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        status_id: "2",
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
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setLots(data.lots);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit,
            }));
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
            accessorKey: "lots_id",
            header: "Lots ID",
            className: "text-xs",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.lots_id}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "label",
            header: "Lots Labels",
        },
        {
            accessorKey: "trip_number",
            header: "Manifest Number",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.trip_number}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "destination",
            header: "Destination",
            cell: ({ row }) => {
                const countryCode = row.original.destination ? row.original.destination.substring(0, 2).toLowerCase() : '';
                return (
                    <>
                        {
                            row.original.destination === null && row.original.destination === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>-</span>
                                            <span className='text-nowrap'>{`${row.original.destination}`}</span>
                                        </div>
                                    </>
                                )
                        }
                    </>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Current Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex w-[130px] flex-row gap-2">
                        <div className="flex flex-row gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="rounded-[3px] h-6 px-2"
                                onClick={() => handleOpenEdit(row.original, row.original.lots_id)}
                            >
                                <p className="text-[11px]">Update</p>
                            </Button>
                            <CustomBrokerDropdownMenus
                                dataID={row.original.lots_id}
                                setIsSkeleton={setIsSkeleton}
                                reload={reload}
                                documents={row.original.documents}
                                key={row.original.lots_id}
                            />
                        </div>
                    </div>
                );
            },
        },
    ]
    const table = useReactTable({
        data: lots,
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

    });

    const handleSearchChange = (event) => {
        setQuery({
            keyword: event.target.value,
            page: 1,
            limit: 10,
            index: 0,
        });

        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })

        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    };
    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        const newExpandedRows = { ...expandedRows };
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };

    const toggleOpenChange = (data) => {
        setOpen(true)
        setDataID(data)
    }
    const reload = () => {
        setIsSkeleton(true);
        fetchData();
    }

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

    const [dataUpdate, setDataUpdate] = useState({});
    const handleOpenEdit = (data, id) => {
        setOpen(true)
        setDataUpdate(data);
        setDataID(id)
    }
    return (
        <>
            <UpdateDialog
                open={open}
                setOpen={setOpen}
                dataID={dataID}
                reload={reload}
                // status={status}
                data={dataUpdate}
            />
            <div className="">
                <div className="wrap inline-flex gap-[10px] justify-evenly items-center py-2 px-2">
                    <SearchBar handleSearch={handleSearchChange} />
                    <Button
                        variant="filter"
                        size="filter"
                        className="border border-zinc-300 flex items-center rounded"
                    >
                        <FilterIcons className="" fill="#CC0019" />
                    </Button>
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
                                        className={`${isLastHeader
                                            ? "w-[30px] "
                                            : isFirstHeader
                                                ? "w-[50px]"
                                                : ""
                                            } text-xs`}
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
                                [...Array(table.getRowModel().rows?.length || 5)].map(
                                    (_, index) => (
                                        <TableRow key={index}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                    key={columnIndex}
                                                    className={`${columnIndex === columns.length - 1
                                                        ? "w-[30px]"
                                                        : columnIndex === 0
                                                            ? "w-[50px]"
                                                            : ""
                                                        } text-xs`}
                                                >
                                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                )}

                            {!isSkeleton && !table.getRowModel().rows?.length && (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ) : (
                        // Jika data telah dimuat, render data aktual
                        table.getRowModel().rows.map((row) => (
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={
                                        row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast
                                                ? "w-[30px]"
                                                : cell.isFirst
                                                    ? "w-[50px]"
                                                    : ""
                                                } text-xs ${expandedRows[row.id] &&
                                                "bg-blue-200 hover:bg-blue-200"
                                                } `}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </>
                        ))
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between w-full items-center mt-3 pb-2">
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
                <Pagination className={"flex justify-end w-full items-center gap-2"}>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
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
    );
}
