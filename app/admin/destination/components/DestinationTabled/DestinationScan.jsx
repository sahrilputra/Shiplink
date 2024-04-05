
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
import { AssignLotsToBin } from "../Dialog/AssignLotsToBin";
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
import { Input } from "@/components/ui/input";
import { DestinationMenus } from "../menus/DestinationMenus";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { UpdateDialog } from "@/app/admin/custom-clearance/components/Menus/UpdateDialog";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

export function DestinationTabled({ handleSelectedRowData, isOpen, setOpen, handleData, isSelected, setTotalData }) {
    const [loading, setLLoading] = useState(false);
    const { toast } = useToast()
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [lots, setLots] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [lotsNumber, setLotsNumber] = useState("");
    const [openAssignLotsDialog, setOpenAssignLotsDialog] = useState(false)
    const [openStatusDialog, setOpenStatusDialog] = useState(false)
    const [getLotsId, setLotsId] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)


    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        lots_id: "",
        status: "",
        destination: "",
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
                `/api/admin/destination/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setLots(data.lots);
            setTotalData(data.lots.length);
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

    const reload = async () => {
        try {
            await fetchData();
            setRowSelection({});
        } catch (error) {
            console.log('Error:', error);
        }
    }


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
            header: "Lots Label",
        },
        {
            accessorKey: "destination_name",
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
            accessorKey: "trip_number",
            header: "Trip Number",
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
            accessorKey: "status",
            header: "Current Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div
                        key={row.id}
                        className="flex w-[40px] items-center justify-center  flex-row gap-2"
                    >
                        <div className="flex flex-row gap-2">
                            <DestinationMenus dataID={row.original.lots_id} reload={reload} />
                        </div>
                    </div>
                )
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

    const handleOpenLots = () => {
        setOpenAssignLotsDialog(true)
    }
    const HandlerGetItemID = (id) => {
        handleData(id);
    }

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

    const toggleOpenChange = () => {
        setOpen(true)
    }

    const handleScanLots = async () => {
        console.log("Scan Lots", lotsNumber)
        setIsButtonDisabled(true)
        try {
            const response = await axios.post(
                `/api/admin/destination/loadLots`,
                {
                    lots_id: lotsNumber
                }
            );
            const data = await response.data;
            console.log("LOAD LOTS CONSOLE : ", data)
            reload();
            toast({
                title: `Lots ${lotsNumber} Has been loaded!`,
                description: response.data.message,
            });
            setIsButtonDisabled(false)
        } catch (error) {
            toast({
                title: 'Cannot Find The Lots!',
                description: `Erorr : ${error}!`,
                status: 'error',
            });
            console.log('Error:', error);
        }
    }

    const sortData = (field, direction) => {
        const sortedData = [...bins];
        sortedData.sort((a, b) => {
            if (direction === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        setLots(sortedData);
    };
    const handleOpenStatusDialog = (data) => {
        setOpenStatusDialog(true)
        setLotsId(data)
    }

    const selectedWarehouseIds = table?.getSelectedRowModel().rows.map(row => row.original.lots_id);
    return (
        <>

            <AssignLotsToBin open={openAssignLotsDialog} setOpen={setOpenAssignLotsDialog} data={selectedWarehouseIds} reload={reload} />
            <div className="flex flex-row justify-between items-center py-2 px-2">
                <div className="wrap inline-flex gap-[10px] justify-evenly items-center ">
                    <SearchBar handleSearch={handleSearchChange} />
                    <Button
                        variant="filter"
                        size="filter"
                        className='border border-zinc-300 flex items-center rounded w-[40px] h-[34px] '>
                        <FilterIcons
                            className=""
                            fill="#CC0019" />
                    </Button>
                    {/* <DatePickerWithRange className={"text-black"} /> */}

                </div>
                <div className="flex flex-row gap-4 w-full justify-between">
                    <div className="flex w-full justify-end focus-visible:ring-1">
                        <Input
                            onChange={(event) => { setLotsNumber(event.target.value) }}
                            className="w-[200px] h-[35px] text-xs rounded-r-none focus-visible:ring-0"
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-[35px] w-[100px] text-xs rounded-none rounded-r-md"
                            onClick={handleScanLots}
                            disabled={isButtonDisabled}
                        >
                            Scan Lots
                        </Button>
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        className={`h-[35px] w-[100px] text-xs rounded-md }`}
                        disabled={Object.keys(rowSelection).length === 0}
                        onClick={handleOpenLots}
                    >
                        Assign Lots
                    </Button>
                </div>
            </div >

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
                                [...Array(table?.getRowModel().rows?.length || 5)].map((_, index) => (
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
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            onClick={() => handleSelectedRowData(row.original)}
                                            key={cell.id}
                                            className={`cursor-pointer ${isSelected === row.original.lots_id ? "bg-blue-200 " : ""} text-xs`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </>
                        ))
                    )}
                </TableBody>

            </Table>


            <div className="flex justify-between w-full items-center mt-3 pb-1 px-4 pt-2">
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
    )
}
