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
import { PlusIcon, Trash2, Trash2Icon } from "lucide-react";
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
import { NewCategory } from "../dialog/NewCategory";
import { DeleteCategory } from "../dialog/DeleteCategory";

export function TableOfCategories({ data, reload, setItemID, itemID, isSkeleton }) {

    console.log("🚀 ~ TableOfCategories ~ data:", data)

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([]);
    const [openNew, setOpenNew] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [categoryID, setCategoryID] = useState([])


    const columns = [
        {
            accessorKey: "select",
            id: "select",
            className: "text-xs w-[30px]",
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
            accessorKey: "categories",
            header: "Categories Name",
            className: "text-xs w-[100px]",
            isSortable: true,
        },
        {
            accessorKey: "action",
            header: "",
            className: "text-xs w-[100px]",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max px-[5px] h-[25px]`}
                            onClick={() => { toggleOpenChange([row.original.category_code]) }}
                        >
                            <Trash2 width={15} height={15} className={` text-myBlue rounded-sm  `} />
                        </Button>

                    </div>
                )
            }
        }
    ]

    const table = useReactTable({
        data: data,
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

    const toggleOpenChange = (id) => {
        setDeleteOpen(true)
        setCategoryID(id)
    }


    // const removeSorting = () => {
    //     setSorting([]);
    //     fetchData();
    // };

    const selectedCategoryId = table.getSelectedRowModel().rows.map(row => row.original.category_code);

    return (
        <>
            <DeleteCategory open={deleteOpen} setOpen={setDeleteOpen} reloadData={reload} deleteID={categoryID} />
            <NewCategory setOpen={setOpenNew} open={openNew} setReloadData={reload} />
            <div className="">
                <div className=" flex w-full flex-row justify-between gap-1 items-center py-2">
                    <SearchBar />

                    <div className=" flex justify-end  ">
                        {Object.keys(rowSelection).length === 0 ? (
                            <Button
                                className="w-9 h-[35px] p-1"
                                variant="secondary"
                                onClick={() => setOpenNew(true)}
                            >
                                <PlusIcon className="text-white" width={20} height={20} />
                            </Button>
                        ) : (
                            <Button
                                variant="destructive"
                                size="icon"
                                className="w-9 h-[35px] p-1"
                                onClick={() => toggleOpenChange(selectedCategoryId)}
                            >
                                <Trash2Icon className="text-white" width={20} height={20} />
                            </Button>
                        )}
                    </div>

                </div>
                {/* <div className="w-[40%] flex justify-end  ">
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
                </div> */}
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
                    {/* <TableBody>
                        {
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    // onClick={() => handleSelect(row.original.bins_id)}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${row.isFirst && "w-[30px]"} text-xs ${itemID === row.original.category_code ? "bg-blue-100" : "bg-white"} `}
                                    onClick={() => setItemID(row.original.category_code)}
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
                    </TableBody> */}

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
                                    className={`${row.isFirst && "w-[30px]"} text-xs ${itemID === row.original.category_code ? "bg-blue-100" : "bg-white"} `}
                                    onClick={() => setItemID(row.original.category_code)}

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
            </div>
        </>
    )
}

// ${isSelected === row.original.bins_id ? " bg-blue-200" : ""} cursor-pointer ${isBinSelect ? "" : "hidden"}