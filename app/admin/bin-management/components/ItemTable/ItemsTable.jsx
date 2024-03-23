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
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons } from "@/components/icons/iconCollection";
import { ExternalLink, MoreHorizontalIcon, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import NextLink from 'next/link';
import { MovePackageDialog } from "../dialog/MovePackageDialog";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
export function ItemTable({ isBinSelect, selectedBinID = "Undefined", setPackageTotal }) {

    console.log("SELECETED BIN ID : ", selectedBinID)
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [openMoveDialog, setOpenMoveDialog] = useState(false);
    const [data, setData] = useState([])
    const [itemTotal, setItemTotal] = useState(0)
    const [selectedItemsID, setSelectedItemsID] = useState([])
    // const [query, setQuery] = useState({
    //     keyword: "",
    //     date_start: "",
    //     date_end: "",
    //     tracking_id: "",
    //     bins_id: `${selectedBinID}`,
    //     page: 0,
    //     limit: 0,
    //     index: 0,
    // });
    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleOpenChange = (data) => {
        setOpenMoveDialog(true)
        setSelectedItemsID(data)
    }

    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };

    const handleRowSelectionChange = (selectedRows) => {
        setRowSelection(selectedRows);
    };

    // setQuery({
    //     ...query,
    //     bins_id: selectedBinID
    // });
    const [searchKeyword, setSearchKeyword] = useState("");
    console.log("🚀 ~ ItemTable ~ searchKeyword:", searchKeyword)
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsSkeleton(true)
            try {
                const response = await axios.post(
                    `/api/admin/bin_manager/packageList`,
                    {
                        "keyword": `${searchKeyword}`,
                        "date_start": "",
                        "date_end": "",
                        "tracking_id": "",
                        "bins_id": `${selectedBinID}`,
                        "page": 0,
                        "limit": 0,
                        "index": 0,
                    }
                );
                const data = await response.data;
                const filteredDataByID = data.package_info.filter((item) => item.bin_location === selectedBinID);
                console.log("🚀 ~ fetchData ~ filteredDataByID:", filteredDataByID)
                setData(filteredDataByID);
                setPackageTotal(filteredDataByID.length || 0)
                setIsSkeleton(false);
            } catch (error) {
                fetchData();
                console.log('Error:', error);
            }
        };

        fetchData();
    }, [searchKeyword, setPackageTotal, selectedBinID]);

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
            accessorKey: "tracking_id",
            header: "Tracking ID",
            className: "text-xs",
            width: 120,
        },
        {
            accessorKey: "customer_name",
            header: "Customer",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "dimension",
            header: "Dimension",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-1">
                        <p className="text-xs">{row?.original.package_witdth} </p> x
                        <p className="text-xs">{row?.original.package_height} </p> x
                        <p className="text-xs">{row?.original.package_length}</p>
                        <p className="text-xs">{row?.original.package_height_unit}</p>
                    </div>
                )
            }
        },
    ]

    const table = useReactTable({
        data: data,
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

    
    const selectedItemsId = table?.getSelectedRowModel().rows.map(row => row.original.tracking_id);


    return (
        <>
            <MovePackageDialog open={openMoveDialog} setOpen={setOpenMoveDialog} data={selectedItemsID} setRowSelection={setRowSelection}  />
            <div className="text-sm bg-transparent py-2">
                <div className="px-2 py-3 " >
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
                        <div className="">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="px-[20px]"
                                disabled={Object.keys(rowSelection).length === 0}
                                onClick={() => toggleOpenChange(selectedItemsId)}
                            >
                                <p className=" text-xs">Move Package</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Table>
                <TableHeader className="text-sm" >
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
                                className={`${row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}`}
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
