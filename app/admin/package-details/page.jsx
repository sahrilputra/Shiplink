/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { addDays, format } from "date-fns";
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import NextLink from 'next/link'
import { Card } from '@/components/ui/card'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    VisibilityState,
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
import { ChevronDown, ChevronUp, ExternalLink, MoreHorizontalIcon } from 'lucide-react'
import { SearchBar } from '@/components/ui/searchBar'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import { Checkbox } from '@/components/ui/checkbox'
import { DeletePackage } from './components/dialog/DeletePackage'
import { PackageMenus } from './components/menus/packageMenus'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
export default function PackageDetails() {

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [openDelete, setOpenDelete] = useState(false);
    const [data, setData] = useState({});
    const [packageID, setPackageID] = useState([]);
    console.log("🚀 ~ CustomerPackage ~ packageID:", packageID)
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const [skeleton, setSkeleton] = useState(true);
    const [openMenus, setOpenMenus] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [packageTotal, setPackageTotal] = useState(0);
    const [query, setQuery] = useState({
        keyword: '',
        date_start: "",
        date_end: "",
        tracking_id: "",
    });
    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const handleSetDate = (newDate) => {
        setDate({
            from: formatDate(newDate?.from || new Date()),
            to: formatDate(newDate?.to || new Date()),
        });

        setQuery({
            ...query,
            date_start: date.from,
            date_end: date.to,
        });
    };
    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/packages/list`,
                    query
                );
                const responseData = response.data.package_info
                console.log("🚀 ~ fetchData ~ response:", responseData)
                setData(responseData);
                setPackageTotal(responseData.total)
                setSkeleton(false)
            } catch (error) {
                setSkeleton(false)
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [query, reloadTrigger]);

    const reloadData = () => {
        setReloadTrigger(!reloadTrigger)
    }
    const columns = [
        {
            accessorKey: "select",
            id: "select",
            size: 50,
            header: ({ table }) => {
                return (
                    <div className="w-[30px] flex justify-center items-center">
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
                    <div className="w-[30px] flex justify-center items-center">
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
        },
        {
            accessorKey: "customer_name",
            header: "Customer Name",
        },
        {
            accessorKey: "customer_email",
            header: "Email",
        },
        {
            accessorKey: "address",
            header: "Origin",
            cell: ({ row }) => {
                return (
                    <div className="text-xs">
                        {`${row.original.warehouse_name_arrival} Wr - ${row.original.country_name_arrival}`}
                    </div>
                )
            }
        },
        {
            accessorKey: "destination",
            header: "Destination",
            cell: ({ row }) => {
                return (
                    <>
                        <div className="text-xs">
                            {`${row.original.warehouse_name_destination} Wr - ${row.original.country_code_destination}`}
                        </div>
                    </>
                )
            }
        },
        {
            accessorKey: "updated_at",
            sortingFn: "datetime",
            header: ({ getSorting }) => {
                return (
                    <div
                        className="cursor-pointer select-none w-[100%] text-center"
                        onClick={() => {
                            setSorting([{ id: "updated_at", desc: !isSortedDesc }]);
                            setIsSortedDesc(!isSortedDesc);
                        }}
                    >
                        <div className="flex flex-row gap-2 items-center text-center">
                            Last Update
                            <>
                                {isSortedDesc ? <ChevronDown className="text-white" width={15} /> : <ChevronUp className="text-white" width={15} />}
                            </>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "bin_location",
            header: "Bin Location",
            size: 50,
        },
        {
            id: "Action",
            header: "Action",
            size: 60,
            cell: ({ row }) => {
                return (
                    <div className="max-w-[100px] w-[80px]" key={row}>
                        <div className="w-full flex flex-row gap-2 items-center justify-center">
                            <NextLink href={`/admin/package-details/${row.original.tracking_id}`}>
                                <Button
                                    variant="ghost"
                                    className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                    <p>Details</p>
                                    <ExternalLink width={10} height={10} />
                                </Button>
                            </NextLink>
                            <PackageMenus handlerDelete={handlerDeleteOpen} itemID={row.original.tracking_id} />
                        </div>
                    </div>
                )
            },
        },
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

    const handlerDeleteOpen = (data) => {
        setOpenDelete(true);
        setPackageID(Array.isArray(data) ? data : [data]);
    }

    const selectedTable = table.getSelectedRowModel().rows.map(row => row.original.tracking_id);

    return (
        <>
            <DeletePackage open={openDelete} setOpen={setOpenDelete} deleteID={packageID} reload={reloadData} />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/verification-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">All Active Packages</h1>
                                <p className=" text-blue-900 text-xs font-normal">Total Active Packages : {packageTotal} </p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.childContent} gap-[15px]`}>
                        <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                            <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                                <SearchBar handleSearch={handleSearchChange} />
                                <DatePickerWithRange
                                    mySetdate={handleSetDate}
                                />
                            </div>
                            <div className="">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="px-5"
                                    onClick={() => { handlerDeleteOpen(selectedTable) }}
                                    disabled={!selectedTable.length}
                                >
                                    <p className=" text-xs">Delete Package</p>
                                </Button>
                            </div>
                        </div>
                        <Table className=" rounded-md">
                            <TableHeader className="text-sm" >
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <>
                                        {headerGroup.headers.map((header, index) => {
                                            const isLastHeader = index === headerGroup.headers.length - 1;
                                            const isFirstHeader = index === 0;
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    style={{ width: `${header.getSize()}px` }}
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

                                {skeleton || !table.getRowModel().rows?.length ? (
                                    <>
                                        {skeleton &&
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

                                        {!skeleton && !table.getRowModel().rows?.length && (
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
                        <div className="flex w-full justify-between items-center px-2">
                            <div className=" text-sm text-muted-foreground w-full">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="flex justify-end w-full items-end p-3">

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

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
