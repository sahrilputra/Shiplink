/* eslint-disable react-hooks/exhaustive-deps */
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
import { MoreHorizontalIcon, Plus, Trash2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, } from "@/components/ui/dialog"

export function TableOfCategories({ data }) {

    console.log("🚀 ~ TableOfCategories ~ data:", data)

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([]);

    const columns = [
        {
            accessorKey: "select",
            id: "select",
            className: "text-xs w-[30px]",
            header: ({ table }) => {
                return (
                    <div className="w-[30px]">
                        <Checkbox
                            checked={
                                table.getIsAllPageRowsSelected() ||
                                (table.getIsSomePageRowsSelected() && "indeterminate")
                            }
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                            aria-label="Select all"
                        />
                    </div>
                )
            },
            cell: ({ row }) => {
                return (
                    <div className="w-[30px]">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"

                        />
                    </div>
                )
            },
        },
        {
            accessorKey: "categories",
            header: "Categories Name",
            className: "text-xs w-[100px]",
            isSortable: true,
        },
        {
            accessorKey: "action",
            header: "Other",
            className: "text-xs w-[100px]",
            isSortable: true,
        }
    ]

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            rowSelection,
        },

    });

    const removeSorting = () => {
        setSorting([]);
        fetchData(); // Memuat kembali data untuk mereset urutan ke aslinya
    };

    // const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.bins_id);

    return (
        <>
            <Table>
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
                    {
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                // onClick={() => handleSelect(row.original.bins_id)}
                                data-state={row.getIsSelected() && "selected"}
                                className={`${row.isFirst && "w-[30px]"} text-xs `}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={`${row.isFirst && "w-[30px]"} text-xs `}
                                    // className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs `}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

// ${isSelected === row.original.bins_id ? " bg-blue-200" : ""} cursor-pointer ${isBinSelect ? "" : "hidden"}