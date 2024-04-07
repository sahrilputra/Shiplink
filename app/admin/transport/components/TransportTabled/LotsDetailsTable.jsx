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
import { ExternalLink } from "lucide-react";
import NextLink from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { RemovePackageDialog } from "../../lots/components/RemovePackageDialog";
export function LotsDetailsTable({
    data,
    setOpen,
    handleSearchChange,
    isSkeleton,
    lostId,
    reload,
    pagination,
    rowTotalData,
    handlerPaginationChange,
    setPagination,
    query,
}) {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteID, setDeleteID] = useState([]);
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    const columns = [
        {
            accessorKey: "select",
            id: "select",
            size: 50,
            className: "px-0",
            header: ({ table }) => {
                return (
                    <div className="flex justify-center items-center px-0 pr-4">
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
                    <div className=" flex justify-center items-center px-0 pr-4 ">
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
            size: 30,
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span style={{ fontFamily: "roboto" }}>
                            {row.original.tracking_id}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "customer_name",
            header: "Customer Name",
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap">
                        <span
                            className="text-[10px] leading-3 tracking-wider  "
                            style={{ fontFamily: "roboto" }}
                        >{`${row.original.customer_id}`}</span>
                        <span>{`${row.original.customer_name}`}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "address",
            header: "Origin",
            cell: ({ row }) => {
                const countryCode = row.original.country_code_arrival
                    ? row.original.country_code_arrival.substring(0, 2).toLowerCase()
                    : "";
                return (
                    <>
                        {row.original.warehouse_name_arrival === null &&
                            row.original.warehouse_name_arrival === null ? (
                            <>-</>
                        ) : (
                            <>
                                <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                    <img
                                        src={`https://flagcdn.com/${countryCode}.svg`}
                                        alt="country icon"
                                        style={{ objectFit: "fill", width: "25px", height: "25px" }}
                                    />
                                    <span>{`- ${row.original.warehouse_name_arrival} WH`}</span>
                                </div>
                            </>
                        )}
                    </>
                );
            },
        },
        {
            accessorKey: "Destination",
            header: "Destination",
            cell: ({ row }) => {
                const countryCode = row.original.country_code_destination
                    ? row.original.country_code_destination.substring(0, 2).toLowerCase()
                    : "";
                return (
                    <>
                        {row.original.warehouse_name_destination === null &&
                            row.original.warehouse_name_destination === null ? (
                            <>-</>
                        ) : (
                            <>
                                <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                    <img
                                        src={`https://flagcdn.com/${countryCode}.svg`}
                                        alt="country icon"
                                        style={{ objectFit: "fill", width: "25px", height: "25px" }}
                                    />
                                    <span className="text-nowrap">
                                        {`- ${row.original.warehouse_name_destination} WH`}{" "}
                                        {`${row.original.services === "Hold pickup" ? "- HFP" : ""
                                            }`}
                                    </span>
                                </div>
                            </>
                        )}
                    </>
                );
            },
        },
        {
            accessorKey: "updated_at",
            header: "Last Update",
            size: 60,
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span style={{ fontFamily: "roboto" }}>
                            {row.original.updated_at}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "bin_location",
            header: "Bin Location",
            size: 50,
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span>
                            {row.original.bin_location !== "Undefined"
                                ? row.original.bin_location
                                : "-"}
                        </span>
                    </div>
                );
            },
        },
        {
            id: "Action",
            header: "Action",
            size: 60,
            cell: ({ row }) => {
                return (
                    <div className="" key={row}>
                        <NextLink
                            href={`/admin/package-details/${row.original.tracking_id}`}
                        >
                            <Button
                                variant="tableBlue"
                                className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center"
                            >
                                <p>Details</p>
                                <ExternalLink width={10} height={10} />
                            </Button>
                        </NextLink>
                    </div>
                );
            },
        },

    ];

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
        onRowSelectionChange: setRowSelection,
        defaultColumn: {
            width: "auto"
        },
        state: {
            sorting,
            rowSelection,
        },
    });

    const handleRemovedPackage = () => {
        setOpenDelete(true);
        setDeleteID(table.getSelectedRowModel().rows.map(row => row.original.tracking_id));
    }
    const selectedItemsID = table.getSelectedRowModel().rows.map(row => row.original.tracking_id);

    return (
        <>
            <RemovePackageDialog open={openDelete} setOpen={setOpenDelete} lotsId={lostId} deleteId={deleteID} reload={reload} />
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
                            <div className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 right-3 text-xs">
                                <SearchIcon width={15} height={15} />
                            </div>
                        </div>
                        <Button
                            variant="filter"
                            size="filter"
                            className="border border-zinc-300 flex items-center rounded"
                        >
                            <FilterIcons className="" fill="#CC0019" />
                        </Button>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={Object.keys(table.getSelectedRowModel().rows).length === 0}
                        onClick={handleRemovedPackage}
                    >
                        <span className="text-xs">Remove Package</span>
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
                                        style={{ width: header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize() }}
                                        key={header.id}
                                        className={`text-xs`}
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
                                        This lot is empty
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
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        style={{ width: cell.column.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : cell.column.getSize() }}
                                        className={` text-xs `}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between w-full items-center mt-3 pb-2">
                <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">
                    <Button
                        variant={`redOutline`}
                        className="px-1 py-1 h-[30px]  text-xs w-[90px]"
                        onClick={handleBack}
                    >
                        <p>BACK</p>
                    </Button>
                </div>
                <Pagination className={'flex justify-end w-full items-center gap-2'}>
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
    );
}


