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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { MoreHorizontalIcon, Plus, Trash2Icon } from "lucide-react";
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
import { DeleteDialog } from "../dialog/DeleteDialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
export function BinTableList({ data, isBinSelect, handleSelect, setCreateNewDialog, isSelected, isReloadData, setBinTotal }) {

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
    const [bins, setBins] = useState([]);
    const [rowSelection, setRowSelection] = React.useState({})
    const [expandedRows, setExpandedRows] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [deleteMuchDialog, setDeleteMuchDialog] = useState(false);
    const [sorting, setSorting] = React.useState([]);

    // Tambahkan fungsi untuk melakukan sorting pada data
    const sortData = (field, direction) => {
        const sortedData = [...bins];
        sortedData.sort((a, b) => {
            if (direction === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        setBins(sortedData);
    };
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/bin_manager/list`,
                query
            );
            const data = await response.data;
            setBins(data.bins);
            setIsSkeleton(false);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit,
            }));
            setBinTotal(data.total);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        if (isReloadData) {
            fetchData();
        }
    }, [query, isReloadData]);

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };


    const reloadData = async () => {
        try {
            await fetchData();
            setRowSelection({}); // Menetapkan kembali objek rowSelection menjadi kosong
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleRowSelectionChange = (selectedRows) => {
        setRowSelection(selectedRows);
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
                        disabled={!isBinSelect}
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
            accessorKey: "bins_id",
            header: "ID",
            className: "text-xs",
            isSortable: true,
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.bins_id}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "row",
            header: "Row",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.row}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "section",
            header: "Section",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.section}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "level",
            header: "Level",
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`${row.original.level}`}
                    </span>
                )
            }
        },
    ]

    const table = useReactTable({
        data: bins,
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
        state: {
            sorting,
            rowSelection,
            pagination,
            query,
        },

    });


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

    const removeSorting = () => {
        setSorting([]);
        fetchData(); // Memuat kembali data untuk mereset urutan ke aslinya
    };

    const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.bins_id);

    return (
        <>
            <DeleteDialog open={deleteMuchDialog} setOpen={setDeleteMuchDialog} deleteID={selectedWarehouseIds} reloadData={reloadData} />
            <Table>
                <TableHeader className="text-sm bg-white text-black">
                    <TableHead colSpan={5} className="p-2" >
                        <div className="flex w-full flex-row justify-between gap-1 items-center">
                            <div className=" w-full flex flex-row gap-2 items-center">
                                {/* <SearchBar handleSearch={handleSearchChange} /> */}
                                <div className="relative">
                                    <Input
                                        type="text" placeholder="Search..."
                                        className="pr-8 pl-2 text-xs border border-zinc-300 text-black"
                                        onChange={handleSearchChange}
                                        disabled={!isBinSelect}
                                    />
                                    <div className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 right-3 text-xs"  >
                                        <SearchIcon
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <Dialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="filter"
                                                    size="filter"
                                                    disabled={!isBinSelect}
                                                    className='border border-zinc-300 flex items-center rounded'>
                                                    <FilterIcons
                                                        className=""
                                                        fill="#CC0019" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side={"bottom"} >
                                                <DropdownMenuItem onClick={() => {
                                                    sortData('bins_id', 'asc');
                                                    setSorting([{ id: 'bins_id', desc: false }]);
                                                }}>
                                                    <p className="text-xs text-myBlue">Sort Ascending</p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => {
                                                    sortData('bins_id', 'desc');
                                                    setSorting([{ id: 'bins_id', desc: true }]);
                                                }}>
                                                    <p className="text-xs">Sort Descending</p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={removeSorting}>
                                                    <p className="text-xs">Remove Sort</p>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </Dialog>
                                </div>

                            </div>
                            <div className="w-[40%] flex justify-end  ">
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
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
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
                                onClick={() => handleSelect(row.original.bins_id)}
                                data-state={row.getIsSelected() && "selected"}
                                className={`${row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""} ${isSelected === row.original.bins_id ? " bg-blue-200" : ""} cursor-pointer ${isBinSelect ? "" : "hidden"}`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        onClick={() => handleSelect(cell.id)}
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

            {/* <div className="flex justify-between w-full items-center mt-3 pb-2">
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
            </div> */}
        </>
    )
}
