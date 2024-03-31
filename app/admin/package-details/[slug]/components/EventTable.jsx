'use client'
import React, { useState, useEffect } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Checkbox } from '@/components/ui/checkbox';

const columns = [
    {
        accessorKey: "id",
        header: "#",
        size: 40,
        cell: (row) => {
            console.log("🚀 ~ EventTable ~ row:", row)
            return <div>{row.row.index + 1}</div>
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "updated_at",
        header: "Update At",
        cell: ({ row }) => {
            return (
                <div
                    className="text-xs flex flex-col flex-wrap number tabular-nums">
                    <span
                        style={{ fontFamily: 'roboto' }}
                    >{row.original.updated_at}</span>
                </div>
            )
        }

    },
    {
        accessorKey: "updated_by",
        header: "Update By",
        cell: ({ row }) => {
            return (
                <div
                    className="text-xs flex flex-col flex-wrap number tabular-nums">
                    <span
                        style={{ fontFamily: 'roboto' }}
                    >{row.original.updated_by}</span>
                </div>
            )
        }
    },
]


export const EventTable = ({ id, status }) => {
    console.log("🚀 ~ EventTable ~ id:", id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/packages/history`,
                    {
                        data: `${id}`
                    }
                )
                console.log("🚀 ~ EventTable ~ response:", response)
                setData(response.data.history);
                setIsSkeleton(false)
            } catch (error) {
                console.log(error)
                setIsSkeleton(false)
            }
        }
        fetchData();
    }, [id, status])


    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [data, setData] = useState([])
    console.log("🚀 ~ EventTable ~ data:", data)
    const [loading, setLoading] = useState(false);
    const [invoiceID, setInvoiceID] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [invStatusID, setInvStatusID] = useState(false)
    const [date, setDate] = useState({
        from: "",
        to: "",
    });

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    })
    return (
        <Table className=" rounded-md">
            <TableHeader className="text-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                    <>
                        {headerGroup.headers.map((header, index) => {
                            const isLastHeader = index === headerGroup.headers.length - 1;
                            return (
                                <TableHead
                                    key={header.id}
                                    style={{ width: header.column.columnDef.size || "auto" }}
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
                            [...Array(table.getRowModel().rows?.length || 1)].map((_, index) => (
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
                                <TableCell colSpan={columns.length} className="h-[40px] text-center">
                                    No History Found
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
                                    className={`${cell.isFirst ? "w-[50px]" : ""} text-xs `}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
