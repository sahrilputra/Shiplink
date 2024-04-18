/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { MoveService } from "../dialog/MoveService";
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
import NextLink from "next/link";


export function ServiceItemTable({
    category_id,
    categoryName
}) {
    console.log("🚀 ~ ServiceItemTable ~ category_id:", category_id)

    const [isSkeleton, setIsSkeleton] = useState(false)
    const [data, setData] = useState([])
    const [openMove, setOpenMove] = useState(false);
    const [query, setQuery] = useState({
        keyword: '',
        page: 0,
        limit: 0,
        index: 0,
        category_id: category_id,
    })
    const fetchData = async () => {
        setIsSkeleton(true)
        try {
            const response = await axios.post(
                '/api/admin/service/list',
                {
                    ...query,
                    category_id: category_id,
                }
            )
            const responseData = await response.data.services;
            const filteredData = responseData.filter(item => item.category_id === category_id);
            console.log("🚀 ~ fetchData ~ filteredData:", filteredData)
            setData(filteredData)
            setIsSkeleton(false)
        } catch (error) {
            console.log("🚀 ~ error:", error)
            setIsSkeleton(false)

        }
    }

    useEffect(() => {
        fetchData();
    }, [query, category_id])

    const reload = () => {
        setIsSkeleton(true)
        setQuery({
            category_id: category_id,
        })
    }
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
            accessorKey: "service_id",
            header: "#",
            className: "text-xs",
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                            className=''>{`${row.original.service_id}`}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "item",
            header: "Item",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                            className='text-right'>$ {`${row.original.price}`}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-row flex-wrap">
                        <NextLink passHref href={`/admin/product-manager/services?service_id=${row.original.service_id}`}>
                            <Button
                                variant="tableBlue"
                                size="tableIcon"
                                className={`rounded-[3px] w-max px-[5px] h-[20px]`}
                            >
                                <p className="text-[11px] py-2">Edit</p>
                            </Button>
                        </NextLink>
                    </div>
                )
            },
        },
    ]

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

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

    })

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

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };

    const toggleOpenChange = (selectedItemsId) => {
        setOpenMove(true)
        console.log("🚀 ~ toggleOpenChange ~ selectedItemsId", selectedItemsId)
    }
    const selectedItemsId = table?.getSelectedRowModel().rows.map(row => row.original.service_id);
    return (
        <>
            <MoveService
                open={openMove}
                setOpen={setOpenMove}
                serviceID={selectedItemsId}
                category_id={category_id}
                reloadData={reload}
            />
            <div className="text-sm bg-transparent py-2">
                <div className="px-2">
                    <p>{categoryName}</p>
                </div>
                <div className="px-2 py-3 ">
                    <div className="flex flex-row justify-between">
                        <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                            <SearchBar handleSearch={handleSearchChange} />
                        </div>
                        <div className="">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="px-[20px]"
                                // disabled={true}
                                disabled={Object.keys(rowSelection).length === 0}
                                onClick={() => toggleOpenChange(selectedItemsId)}
                            >
                                <p className=" text-xs">Move Items</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
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
                                        className={`${isLastHeader
                                            ? "w-[30px] "
                                            : isFirstHeader
                                                ? "w-[50px]"
                                                : ""
                                            } text-xs`}
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
                                [...Array(table.getRowModel().rows?.length || 5)].map(
                                    (_, index) => (
                                        <TableRow key={index}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                    key={columnIndex}
                                                    className={`${columnIndex === columns.length - 1
                                                        ? "w-[30px]"
                                                        : columnIndex === 0
                                                            ? "w-[50px]"
                                                            : ""
                                                        } text-xs`}
                                                >
                                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                )}

                            {!isSkeleton && !table.getRowModel().rows?.length && (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
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
                                className={`${row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""
                                    }`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={`${cell.isLast
                                            ? "w-[30px]"
                                            : cell.isFirst
                                                ? "w-[50px]"
                                                : ""
                                            } text-xs `}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    );
}
