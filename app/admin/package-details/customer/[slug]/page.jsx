/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
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
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { useTimeFormat } from '@/context/TimeFormatProvider'
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, ExternalLink } from 'lucide-react'
export default function CustomerPackage({ params }) {
    console.log("Helo", params.slug)

    const router = useRouter()
    const { dateFormat, timeFormat } = useTimeFormat()

    const handleBack = () => {
        router.back()
    }
    const customerID = params.slug
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [openItemsDialog, setOpenItemsDialog] = useState(false)
    const [selectedItemsID, setSelectedItemsID] = useState([])
    const [openInternal, setOpenInternal] = useState(false);
    const [data, setData] = useState({});
    const [skeleton, setSkeleton] = useState(true);
    const [query, setQuery] = useState({
        keyword: '',
        date_start: "",
        date_end: "",
        tracking_id: "",
        customer_id: customerID || "",
        page: 1,
        limit: 10,
        index: 0,
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/packages/list`,
                query
            );
            console.log(response)
            const responseData = response.data.package_info
            const data = await response.data;
            const filterDataByCustomerID = responseData.filter((item) => item.customer_id === customerID)
            console.log("🚀 ~ fetchData ~ filterDataByCustomerID:", filterDataByCustomerID)
            setData(filterDataByCustomerID);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setSkeleton(false)
        } catch (error) {
            setSkeleton(false)
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const columns = [

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
            accessorKey: "destination",
            header: "Destination",
            cell: ({ row }) => {
                const countryCode = row.original.country_code_destination ? row.original.country_code_destination.substring(0, 2).toLowerCase() : '';
                return (
                    <>
                        {
                            row.original.warehouse_name_destination === null && row.original.warehouse_name_destination === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-1 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span className='text-nowrap'>
                                                {`- ${row.original.warehouse_name_destination} WH`} {`${row.original.services === "Hold pickup" ? "- HFP" : ""}`}
                                            </span>
                                        </div>
                                    </>
                                )
                        }
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

                    >
                        <div className="flex flex-row gap-2 items-center text-center">
                            Last Update
                        </div>
                    </div>
                );
            },
            cell: ({ row }) => {
                return (
                    <div
                        className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                        >
                            {moment(row.original.updated_at).format(`${dateFormat}, ${timeFormat}`)}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "bin_location",
            header: "Bin Location",
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                            className=''>{`${row.original.bin_location === "Undefined" ? "-" : row.original.bin_location}`}
                        </span>
                    </div>
                )
            },
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="w-[80px]" key={row}>
                        <div className="flex flex-row gap-2">
                            <NextLink href={`/admin/package-details/${row.original.tracking_id}`}>
                                <Button
                                    variant="ghost"
                                    className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                    <p>Details</p>
                                    <ExternalLink width={10} height={10} />
                                </Button>
                            </NextLink>
                        </div>
                    </div>
                )
            },
        },
    ]

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowTotalData, setRowTotalData] = useState({
        page_limit: 0,
        page_total: 0,
        total: 0
    })


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
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
            rowSelection,
            pagination,
            query,
        },

    });

    return (
        <>
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
                                <h1 className=" text-zinc-900 text-sm font-bold ">Customer Package List</h1>
                                <p className=" text-blue-900 text-xs font-normal">Showing Package For Customer : {customerID} </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.childContent}>
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

                        <div className="flex justify-between w-full items-center mt-3 pb-2">
                            <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">
                                {/* <strong>
                                    {table.getFilteredSelectedRowModel().rows.length}
                                </strong>
                                of{" "} */}
                                <div className="flex flex-row gap-1">
                                    <Button
                                        variant={`redOutline`}
                                        size="xs"
                                        className="px-1 py-1 h-[30px] w-[60px] text-xs"
                                        onClick={handleBack}
                                    >
                                        <p className="text-nowrap">Back</p>
                                    </Button>
                                    {/* <strong>
                                        {table.getFilteredRowModel().rows.length}
                                    </strong>
                                    <p className="text-nowrap"> row(s) selected.</p> */}
                                </div>
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
                    </div>
                </div>
            </div>
        </>
    )
}
