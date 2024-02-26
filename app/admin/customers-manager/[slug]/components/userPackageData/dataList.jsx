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
import { MoreHorizontalIcon } from "lucide-react";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
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
import { Input } from "@/components/ui/input";


export function CustomerPackageList({ dataID, isOpen, setOpen }) {
    const [query, setQuery] = useState({
        keyword: ``,
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 0,
        limit: 0,
        index: 0,
    })
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [data, setData] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true)

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/verification/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setData(data.package_info);
            console.log("Package Length : ", data.package_info.length)
            setIsSkeleton(false);
        } catch (error) {
            setIsSkeleton(false);
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [query]);

    const columns = [
        {
            accessorKey: "tracking_id",
            header: "Package ID",
            className: "text-xs",
        },

        {
            accessorKey: "destination",
            header: "Destination",
            className: "text-xs",
        },
        {
            accessorKey: "address",
            header: "Dimension",
            cell: ({ row }) => {
                return (
                    <div className="text-nowrap" key={row}>
                        {row.original.package_length} x {row.original.package_witdth} x {row.original.package_height} {row.original.package_height_unit}, {row.original.package_weight} {row.original.package_weight_unit}
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="w-[60px]" key={row}>
                        <div className="flex flex-row gap-2 ">
                            <Button
                                onClick={() => toggleRow(row.id)}
                                variant="tableBlue"
                                size="tableIcon"
                                className={` w-max px-[5px] h-[25px]`}
                            >
                                <p>Details</p>
                            </Button>
                        </div>
                    </div>
                )
            },
        }
    ]

    const filterData = data.filter(item => item?.customer_id === dataID)


    const table = useReactTable({
        data: filterData,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
    });


    return (
        <>
            <div className="text-sm bg-white text-black pb-3">
                <div className="flex flex-row justify-between">
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center px-2">
                        Showing User Package
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
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={row.isLast ? "w-[60px]" : row.isFirst ? "w-[50px]" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[60px]" : cell.isFirst ? "w-[50px]" : ""} text-xs  ${expandedRows[row.id] && "bg-blue-100 hover:bg-blue-100"}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}
