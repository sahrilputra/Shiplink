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


export function WarehouseDataList({ }) {

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [warehouse, setWarehouse] = useState([]);
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
                            <NextLink href={"/admin/warehouse-manager/1"}>
                                <Button
                                    variant="tableBlue"
                                    size="sm"
                                    className="h-6 px-3"
                                >
                                    <p className="text-xs">Details</p>
                                </Button>
                            </NextLink>
                            <WarehouseMenus />
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

    const reloadData = () => {
        fetchData();
    };
    return (
        <>
            <NewWarehouseDialog open={openNewWarehouse} setOpen={setOpenNewWarehouse} reload={reloadData} />
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
                    <Button
                        variant="destructive"
                        size="sm"
                        className='border border-zinc-300 flex items-center rounded'
                        onClick={() => setOpenNewWarehouse(true)}
                    >
                        <p>New Warehouse</p>
                    </Button>
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
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs `}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </>
    )
}
