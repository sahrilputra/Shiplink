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
import { MoreHorizontalIcon } from "lucide-react";
import { NewWarehouseDialog } from "../dialog/NewWarehouseDialog";
import NextLink from "next/link";
import { WarehouseMenus } from "../menus/WarehouseMenus";
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
import { DeleteSingleWarehouse } from "../dialog/DeleteSingleWarehouse";
import { DeleteMuchWarehouse } from "../dialog/DeleteMuchWarehouse";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export function WarehouseDataList({ setWrTotal }) {

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
    const [editedWr, setEditedWr] = useState({});
    const [selectedWrID, setSelectedWRID] = useState("");
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/warehouse/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setWarehouse(data.warehouse);
            setIsSkeleton(false);
            console.log('warehouse.length()', data.total)
            setWrTotal(data.total);
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
            accessorKey: "warehouse_id",
            header: "ID",
            className: "text-xs",
        },
        {
            accessorKey: "warehouse_name",
            header: "Name",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "phone_number",
            header: "Phone",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="" key={row}>
                        <div className="flex flex-row gap-2">
                            <NextLink href={`/admin/warehouse-manager/${row.original.warehouse_id}`}>
                                <Button
                                    variant="tableBlue"
                                    size="sm"
                                    className="h-6 px-3"
                                >
                                    <p className="text-xs">Details</p>
                                </Button>
                            </NextLink>
                            <div className="">
                                <Dialog>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="tableBlue"
                                                size="tableIcon"
                                                className={`rounded-sm w-max px-[5px] h-[25px]`}
                                            >
                                                <MoreHorizontalIcon width={15} height={15} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side={"left"} sideOffset={2}>
                                            <DropdownMenuItem
                                            >
                                                <p className="text-xs text-myBlue">Settings</p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handlerEdit(row.original)}
                                            >
                                                <p className="text-xs">Edit Information</p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                triggerChildren="Delete"
                                                onClick={() => handlerDelete(row.original.warehouse_id)}
                                            >
                                                <p className="text-xs text-red-800">Delete</p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                )
            },
        }
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

    const reloadData = () => {
        fetchData();
    };

    const handlerEdit = (item) => {
        setEditedWr(item)
        setSelectedWRID(item.warehouse_id)
        setOpenNewWarehouse(true);
    }

    const handleNewDilog = () => {
        setEditedWr(null)
        setSelectedWRID(null)
        setOpenNewWarehouse(true);
    }
    return (
        <>
            <DeleteMuchWarehouse open={deleteMuchDialog} setOpen={setDeleteMuchDialog} deleteID={selectedWarehouseIds} reloadData={reloadData} />
            <DeleteSingleWarehouse open={deleteDialog} setOpen={setDeleteDialog} deleteID={deleteID} reloadData={reloadData} />
            <NewWarehouseDialog open={openNewWarehouse} setOpen={setOpenNewWarehouse} reload={reloadData} data={editedWr} warehouse_id={selectedWrID} />
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
                                variant="destructive"
                                size="sm"
                                className='border border-zinc-300 flex items-center rounded'
                                onClick={() => handleNewDilog()}
                            >
                                <p>New Warehouse</p>
                            </Button>
                        ) : (
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-[100px]"
                                onClick={() => setDeleteMuchDialog(true)}
                            >
                                <p className=" text-xs">Delete</p>
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


