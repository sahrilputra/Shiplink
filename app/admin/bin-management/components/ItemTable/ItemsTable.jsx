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
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ExpandedTable } from "./ExpandedTable";
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
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        bins_id: `${selectedBinID}`,
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

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleOpenChange = (data) => {
        setOpenMoveDialog(true)
        setSelectedItemsID(data)
    }

    const toggleRow = (index) => {
        // const newExpandedRows = [...expandedRows];
        // newExpandedRows[index] = !newExpandedRows[index];
        // setExpandedRows(newExpandedRows);
        const newExpandedRows = {};
        if (expandedRows[index]) {
            setExpandedRows({});
        } else {
            newExpandedRows[index] = true;
            setExpandedRows(newExpandedRows);
        }
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

    const fetchData = async () => {
        setIsSkeleton(true)
        try {
            const response = await axios.post(
                `/api/admin/bin_manager/packageList`,
                {
                    ...query,
                    bins_id: `${selectedBinID}`,
                    keyword: searchKeyword,
                }
            );
            const data = await response.data;
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit,
            }));
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

    const reload = () => {
        fetchData();
        setRowSelection({});
    }
    useEffect(() => {
        fetchData();
    }, [searchKeyword, setPackageTotal, selectedBinID, query]);

    const columns = [
        {
            accessorKey: "select",
            id: "select",
            size: 20,
            header: ({ table }) => {
                return (
                    <div className="w-full items-center justify-center flex pr-2 px-0">
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
                    <div className="w-full items-center justify-center flex pr-2 px-0">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: "tracking_id",
            header: "Tracking ID",
            className: "text-xs",
            size: 50,
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.tracking_id}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "customer_name",
            header: "Customer",
            size: 80,
        },
        {
            accessorKey: "country_code_destination",
            header: "Destination",
            size: 50,
            cell: ({ row }) => {
                const countryCode = row.original.country_code_destination ? row.original.country_code_destination.substring(0, 2).toLowerCase() : '';
                return (
                    <>
                        {
                            row.original.country_code_destination === null && row.original.country_code_destination === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>-</span>
                                            <span className='text-nowrap'>{`${row.original.country_code_destination}`}</span>
                                        </div>
                                    </>
                                )
                        }
                    </>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "dimension",
            header: "Dimension",
            size: 80,
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-1" style={{ fontFamily: 'roboto' }}>
                        <p className="text-xs">{row?.original.package_witdth} </p> x
                        <p className="text-xs">{row?.original.package_height} </p> x
                        <p className="text-xs">{row?.original.package_length}</p>
                        <p className="text-xs">{row?.original.package_height_unit}</p>
                    </div>
                )
            }
        },
        {
            size: 40,
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => toggleOpenChange(row.original)}
                        >
                            <p className="text-[11px]">Move</p>
                        </Button>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => toggleRow(row.id)}

                        >
                            <ArrowDownV2Icons
                                width={15}
                                height={15}
                                className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[row.id] ? "rotate-180" : ""
                                    }`}
                            />
                        </Button>
                    </div>
                );
            },
        },
    ]

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


    const table = useReactTable({
        data: data,
        columns,
        manualPagination: true,
        pageCount: rowTotalData.page_total,
        rowCount: rowTotalData.page_limit,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: handleRowSelectionChange,
        defaultColumn: {
            width: "auto"
        },
        state: {
            sorting,
            rowSelection,
            pagination,
            query,
        },

    });


    const selectedItemsId = table?.getSelectedRowModel().rows.map(row => row.original.tracking_id);


    return (
        <>
            <MovePackageDialog open={openMoveDialog} setOpen={setOpenMoveDialog} data={selectedItemsID} setRowSelection={setRowSelection} reload={reload} />
            <div className="text-sm bg-transparent py-2">
                <div className="px-2  " >
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
                                        style={{ width: header.getSize() }}
                                        className={` text-xs`}
                                    >
                                        {/* ${isLastHeader ? "w-[50px] " : isFirstHeader ? "w-[50px]" : ""} */}
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
                                                className={`${columnIndex === columns.length - 1 ? "w-[50px]" : columnIndex === 0 ? "w-[50px]" : ""} text-xs`}
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
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${row.isLast ? "w-[50px]" : row.isFirst ? "w-[50px]" : ""} cursor-pointer`}
                                    onClick={() => toggleRow(row.id)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs ${expandedRows[row.id] && "bg-blue-200 hover:bg-blue-200 "} `}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>

                                    ))}
                                </TableRow>
                                {
                                    expandedRows[row.id] && (
                                        <>
                                            <TableRow >
                                                <TableCell colSpan={7} className="w-full p-1 px-[10px] py-[10px] bg-blue-100">
                                                    {/* <ExpandedLotsData data={row.original} lotsID={row.original.lots_id} key={row.original.lots_id} setExpandedRows={setExpandedRows} /> */}
                                                    <ExpandedTable data={row.original} pakcage_id={row.original.tracking_id} key={row.original.tracking_id} setExpandedRows={setExpandedRows} />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                }
                            </>
                        ))

                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between w-full items-center mt-3 pb-2">
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
                <Pagination className={"flex justify-end w-full items-center gap-2"}>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
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
                </Pagination>
            </div>
        </>
    )
}
