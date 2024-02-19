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
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { DeleteIcons } from "@/components/icons/iconCollection";
import { NewRoleDialog } from "../dialog/NewRoleDialog";
import { NewUserDialog } from "../dialog/CreateNewUsersDialog";
import { MoreRoleAction } from "../menus/MoreRoleAction";
import { MoreTableAction } from "../menus/MoreTableAction";
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

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({})
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/user/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setUser(data.users);
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
            accessorKey: "user_code",
            header: "User ID",
            className: "text-xs",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "type",
            header: "Account Type",
        },
        {
            accessorKey: "role",
            header: "Role",
        },

        {
            accessorKey: "warehouse_id",
            header: "Warehouse ID",
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
                            <NextLink href={`/admin/user-permission/${row.original.user_id}`}>
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
                                            <DropdownMenuItem
                                                className="text-xs">
                                                User Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-xs">
                                                Change Role
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
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
        fetchData();
    };
    return (
        <>
            <NewRoleDialog open={roleDialogOpen} setOpen={setRoleDialogOpen} />
            <NewUserDialog open={newUserDialogOpen} setOpen={setNewUserDialogOpen} reload={reloadData} />

            <div className="text-sm bg-white text-black">
                <div className="py-2 px-3" >
                    <div className="flex flex-row justify-between">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                            <SearchBar handleSearch={setQuery} />
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
                        <div className="inline-flex gap-[10px] justify-evenly items-center">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-[120px]"
                                onClick={() => setNewUserDialogOpen(true)}
                            >
                                <p className=" text-xs">Create New User</p>
                            </Button>
                            <MoreRoleAction setRoleDialogOpen={setRoleDialogOpen} />
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
        </>
    )
}
