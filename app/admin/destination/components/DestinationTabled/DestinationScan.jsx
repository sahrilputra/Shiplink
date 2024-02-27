
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


    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        lots_id: "",
        status: "",
        destination: "",
        page: 0,
        limit: 0,
        index: 0,
    });
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
        },
        {
            accessorKey: "label",
            header: "Lots Label",
        },
        {
            accessorKey: "destination_name",
            header: "Destination",
        },
        {
            accessorKey: "trip_number",
            header: "Trip Number",
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
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
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
            ...query,
            keyword: event.target.value
        });
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
        try {
            const response = await axios.post(
                `/api/admin/destination/loadLots`,
                {
                    lots_id: lotsNumber
                }
            );
            const data = await response.data;
            console.log(data)
            reload();
            toast({
                title: `{${lotsNumber}} Has been loaded!`,
                description: response.data.message,
                status: 'success',
            });
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

            
            <div className="flex justify-end w-full items-end p-3">
                <Pagination className={'flex justify-end w-full items-end'}>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={"cursor-pointer"}
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            />
                        </PaginationItem>
                        {/* {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((pageNumber) => (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    className={"cursor-pointer"}
                                    onClick={() => table.setPageIndex(pageNumber - 1)}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        ))} */}
                        <PaginationItem>
                            <PaginationNext
                                className={"cursor-pointer"}
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}
