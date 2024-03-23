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
import { addDays, format } from "date-fns";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { EditLotsDialog } from "../AssignLotsDialog/EditLotsDialog";
import { LotsMoreMenusDropDrown } from "../menus/LotsMoreMenus";
import { ExpandedLotsData } from "./ExpandedLotsData";
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export function LotsItemsTable({ data, isOpen, setOpen, setOpenNewDialog }) {
    const [isEditDialog, setEditDialog] = useState(false);

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [lots, setLots] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [dataLots, setDataLots] = useState({})
    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    console.log("🚀 ~ LotsItemsTable ~ date:", date)

    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 0,
        limit: 0,
        index: 0

    });
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setLots(data.lots);
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleSetDate = (newDate) => {
        setDate({
            from: formatDate(newDate?.from || new Date()),
            to: formatDate(newDate?.to || new Date()),
        });

        setQuery({
            ...query,
            date_start: date.from,
            date_end: date.to,
        });
    };
    const columns = [

        {
            accessorKey: "lots_id",
            header: "Lots ID",
            className: "text-xs",
        },
        {
            accessorKey: "label",
            header: "Lots Labels",
        },
        {
            accessorKey: "destination",
            header: "Destination",
        },
        {
            accessorKey: "pickup_schedule",
            header: "Pickup Schedule",
        },
        {
            accessorKey: "documents",
            header: "Documents",
            cell: ({ row }) => {
                // Memeriksa apakah data documents ada dan tidak kosong
                if (row.original.documents && row.original.documents.trim() !== "") {
                    // Memisahkan string berdasarkan tanda koma dan mengambil panjang array
                    const documentCount = row.original.documents.split(',').length;
                    return (
                        <div className="text-xs">
                            {documentCount}
                        </div>
                    )
                } else {
                    // Menampilkan pesan jika tidak ada data documents atau kosong
                    return (
                        <div className="text-xs">
                            No documents
                        </div>
                    )
                }
            }
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
                    <div className="flex w-[130px] flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => handleEditOpen(row.original)}
                        >
                            <p className="text-[11px]">Edit Lots</p>
                        </Button>
                        <LotsMoreMenusDropDrown data={row.original} dataID={row.original.lots_id} />
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => toggleRow(row.id)}
                        >
                            <ArrowDownV2Icons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[row.id] ? 'rotate-180' : ''}`} />
                        </Button>
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

    const reloadData = () => {
        setIsSkeleton(true)
        fetchData();
    }
    const handleEditOpen = (item) => {
        setEditDialog(true)
        setDataLots(item)
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
    return (
        <>
            <EditLotsDialog open={isEditDialog} setOpen={setEditDialog} data={dataLots} reload={reloadData} />
            <div className="">
                <div className="wrap inline-flex gap-[10px] justify-evenly items-center pb-3">
                    <SearchBar handleSearch={handleSearchChange}/>
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

                    {isSkeleton || !table?.getRowModel().rows?.length ? (
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
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs ${expandedRows[row.id] && "bg-blue-200 hover:bg-blue-200"} `}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {
                                    expandedRows[row.id] && (
                                        <>
                                            <TableRow >
                                                <TableCell colSpan={7} className="w-full p-1 px-[10px] py-[10px] bg-blue-100">
                                                    <ExpandedLotsData data={row.original} />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                }
                            </>
                        ))
                    )}
                </TableBody>

            </Table>
            <div className="flex justify-end w-full items-end py-3">
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
