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

export function LotsItemsTable({ data, isOpen, setOpen }) {
    const [isEditDialog, setEditDialog] = useState(false);

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [lots, setLots] = useState([]);
    const [deleteID, setDeleteId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteMuchDialog, setDeleteMuchDialog] = useState(false);
    const [isSkeleton, setIsSkeleton] = useState(true);

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
                            onClick={() => setEditDialog(true)}
                        >
                            <p className="text-[11px]">Edit Lots</p>
                        </Button>
                        <LotsMoreMenusDropDrown data={data} dataID={row.original} />
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => toggleRow(row.id)}
                        >
                            <ArrowDownV2Icons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[row.original] ? 'rotate-180' : ''}`} />
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
            <div className="">
                <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                    <SearchBar />
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
                                                    <ExpandedLotsData />
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
            <EditLotsDialog open={isEditDialog} setOpen={setEditDialog} />
        </>
    )
}
