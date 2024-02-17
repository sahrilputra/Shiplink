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
import { DeleteDialog } from "../dialog/DeleteDialog";

export function BinTableList({ data, isOpen, setOpen, handleSelect, setCreateNewDialog, isSelected, isReloadData }) {

    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [bins, setBins] = useState([]);
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [deleteMuchDialog, setDeleteMuchDialog] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/bin_manager/list`,
                query
            );
            const data = await response.data;
            setBins(data.bins);
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        if (isReloadData) {
            fetchData();
        }
    }, [query, isReloadData]);

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };


    const reloadData = async () => {
        try {
            await fetchData();
            setRowSelection({}); // Menetapkan kembali objek rowSelection menjadi kosong
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleRowSelectionChange = (selectedRows) => {
        setRowSelection(selectedRows);
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
            accessorKey: "bins_id",
            header: "ID",
            className: "text-xs",
        },
        {
            accessorKey: "row",
            header: "Row",
        },
        {
            accessorKey: "section",
            header: "Section",
        },
        {
            accessorKey: "level",
            header: "Level",
        },
    ]

    const table = useReactTable({
        data: bins,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: handleRowSelectionChange,
        state: {
            sorting,
            rowSelection,
        },

    });

    const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.bins_id);

    return (
        <>
            <DeleteDialog open={deleteMuchDialog} setOpen={setDeleteMuchDialog} deleteID={selectedWarehouseIds} reloadData={reloadData} />
            <Table>
                <TableHeader className="text-sm bg-white text-black">
                    <TableHead colSpan={5} className="p-2" >
                        <div className="flex w-full flex-row justify-between gap-1 items-center">
                            <div className=" w-full flex flex-row gap-2 items-center">
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
                            <div className="w-[40%] flex justify-end  ">
                                {Object.keys(rowSelection).length === 0 ? (
                                    <Button
                                        onClick={() => setCreateNewDialog(true)}
                                        variant="filter"
                                        size="icon"
                                        className="w-[34px] h-[34px] border border-neutral-200 flex items-center"
                                    >
                                        <Plus fill="#CC0019" />
                                    </Button>
                                ) : (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteMuchDialog(true)}
                                        className="w-[34px] h-[34px] border border-neutral-200 flex items-center"
                                    >
                                        <Trash2Icon fill="#CC0019" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
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
                                className={row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}
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
        </>
    )
}
