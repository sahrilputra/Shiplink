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
import { FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, MoreHorizontalIcon } from "lucide-react";
import NextLink from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, } from "@/components/ui/dialog"

export function SingleItemsTable({ isOpen, setOpen, setOpenNewDialog }) {

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [warehouse, setWarehouse] = useState([]);
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
                `/api/admin/transport/singleItem/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setWarehouse(data.package_info);
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };
    const columns = [

        {
            accessorKey: "tracking_id",
            header: "Tracking ID",
            className: "text-xs",
        },
        {
            accessorKey: "customer_name",
            header: "Customer Name",
        },
        {
            accessorKey: "address",
            header: "Origin",
        },
        {
            accessorKey: "phone_number",
            header: "Destination",
        },
        {
            accessorKey: "updated_at",
            header: "Last Update",
        },
        {
            accessorKey: "status",
            header: "Customs Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="w-[80px]" key={row}>
                        <div className="flex flex-row gap-2">
                            <NextLink href={"/admin/package-details/2"}>
                                <Button
                                    variant="ghost"
                                    className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                    <p>Details</p>
                                    <ExternalLink width={10} height={10} />
                                </Button>
                            </NextLink>
                            <Button
                                variant="tableBlue"
                                size="tableIcon"
                                className={`w-max px-[10px] h-[25px]`}
                                onClick={() => toggleOpenChange()}
                            >
                                <p className="text-[11px]">Assign</p>
                            </Button>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "select",
            id: "select",
            header: ({ table }) => {
                return (
                    <div className="w-[40px]">
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
                    <div className="w-[40px]">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: warehouse,
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

    console.log("ROW Select Model: ", table.getSelectedRowModel().rows.map(row => row.original.warehouse_id));
    const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.warehouse_id);

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
    const handlerDelete = (item) => {
        setDeleteId(item)
        setDeleteDialog(true)
    }

    const toggleOpenChange = () => {
        setOpen(true)
    }

    const toggleOpenNewLots = () => {
        setOpenNewDialog(true)
    }
    const reloadData = () => {
        fetchData();
    };
    return (
        <>
            <div className="text-sm bg-white text-black pb-3">
                <div className="flex flex-row justify-between">
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="pr-8 pl-2 text-xs border border-zinc-300"
                                onChange={handleSearchChange}

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
                    </div>
                    {
                        Object.keys(rowSelection).length === 0 ? (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="px-10"
                                onClick={() => toggleOpenNewLots()}
                            >
                                <p className=" text-xs">New Lots</p>
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="px-10"
                                onClick={() => toggleOpenChange()}
                            >
                                <p className=" text-xs">Assign to Lot</p>
                            </Button>
                        )
                    }
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
        </>
    )
}


