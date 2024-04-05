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
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import NextLink from 'next/link'
import { FilterIcons } from "@/components/icons/iconCollection";
import { SearchBar } from "@/components/ui/searchBar";
import { NewRoleDialog } from "../dialog/NewRoleDialog";
import { NewUserDialog } from "../dialog/CreateNewUsersDialog";
import { MoreRoleAction } from "../menus/MoreRoleAction";
import { MoreTableAction } from "../menus/MoreTableAction";
import { DeleteUsersDialog } from "../dialog/DeleteUsersDialog";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight, ChevronsRightIcon, ChevronsLeftIcon } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

export function UserTable() {

    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteID, setDeleteID] = useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({})
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [query, setQuery] = useState({
        keyword: "",
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
                `/api/admin/user/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setUser(data.users);
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

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

    useEffect(() => {
        fetchData();
    }, [query]);


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
            accessorKey: "name",
            header: "User Name",
            className: "text-xs",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            accessorKey: "warehouse_name",
            header: "Warehouse Name",
        },

        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="" key={row}>
                        <div className="flex flex-row gap-2">
                            <NextLink href={`/admin/user-permission/profiles/${row.original.user_code}`}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-6 px-2"
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
                                            <DropdownMenuItem className="text-xs text-myBlue">
                                                <NextLink href={"/admin/user-permission/permission"}>
                                                    Manage User Permission
                                                </NextLink>
                                            </DropdownMenuItem>
                                            <NextLink href={`/admin/user-permission/profiles/${row.original.user_code}`} passHref>
                                                <DropdownMenuItem
                                                    className="text-xs">
                                                    User Details
                                                </DropdownMenuItem>
                                            </NextLink>
                                            <DropdownMenuItem
                                                onClick={() => handlerDelete(row.original.user_code)}
                                                className="text-xs text-red-700">
                                                Delete User
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
        data: user,
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

    const reloadData = () => {
        fetchData();
        setRowSelection({});
    };

    const handlerDelete = (itemOrItems) => {
        if (Array.isArray(itemOrItems) && itemOrItems.length > 0) {
            setDeleteID(itemOrItems);
            setDeleteOpen(true);
        } else {
            setDeleteID([itemOrItems]);
            setDeleteOpen(true);
        }
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
    const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.user_code);

    return (
        <>
            <DeleteUsersDialog open={deleteOpen} setOpen={setDeleteOpen} reloadData={reloadData} deleteID={deleteID} />
            <NewRoleDialog open={roleDialogOpen} setOpen={setRoleDialogOpen} />
            <NewUserDialog open={newUserDialogOpen} setOpen={setNewUserDialogOpen} reload={reloadData} />

            <div className="text-sm bg-white text-black">
                <div className="py-2 px-3" >
                    <div className="flex flex-row justify-between">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
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
                        <div className="inline-flex gap-[10px] justify-evenly items-center">
                            {
                                Object.keys(rowSelection).length === 0 ? (
                                    <>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="w-[120px]"
                                            onClick={() => setNewUserDialogOpen(true)}
                                        >
                                            <p className=" text-xs">Create New User</p>
                                        </Button>
                                        <MoreRoleAction setRoleDialogOpen={setRoleDialogOpen} />
                                    </>
                                ) : (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="w-[100px]"
                                        onClick={() => handlerDelete(selectedWarehouseIds)}
                                    >
                                        <p className=" text-xs">Delete</p>
                                    </Button>
                                )
                            }


                        </div>
                    </div>
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
            <div className="flex justify-between w-full items-end mt-1 pb-2">
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
                <Pagination className={'flex justify-end w-full items-end gap-2'}>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
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
                    <PaginationContent>


                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}
