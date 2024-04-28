/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { addDays, format } from "date-fns";
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import moment from 'moment/moment'
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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsLeftIcon, ChevronsRightIcon, ExternalLink, MoreHorizontalIcon } from 'lucide-react'
import { SearchBar } from '@/components/ui/searchBar'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import { Checkbox } from '@/components/ui/checkbox'
import { DeletePackage } from './components/dialog/DeletePackage'
import { PackageMenus } from './components/menus/packageMenus'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { TimeFormatProvider, useTimeFormat } from '@/context/TimeFormatProvider'

export default function PackageDetails() {
    const { timeFormat, dateFormat } = useTimeFormat();
    console.log("🚀 ~ PackageDetails ~ dateFormat:", dateFormat)
    console.log("🚀 ~ PackageDetails ~ timeFormat:", timeFormat)
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
        page: 1,
        limit: 10,
        index: 0,
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
            date_start: date.from,
            date_end: date.to,
            page: 1,
            limit: 10,
            index: 0,
        });
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });

        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    };
    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowTotalData, setRowTotalData] = useState({
        page_limit: 0,
        page_total: 0,
        total: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/packages/list`,
                    {
                        ...query,
                        page: pagination.pageIndex + 1,
                        limit: pagination.pageSize,
                    }
                );
                const responseData = response.data
                console.log("🚀 ~ fetchData ~ response:", responseData)
                setData(responseData.package_info);
                setPackageTotal(responseData.total)
                setRowTotalData({
                    page_limit: responseData.page_limit,
                    page_total: responseData.page_total,
                    total: responseData.total
                });
                setPagination(prevPagination => ({
                    ...prevPagination,
                    pageSize: responseData.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
                }));
                setSkeleton(false)
            } catch (error) {
                setSkeleton(false)
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [query, reloadTrigger]);

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



    const columns = [
        {
            accessorKey: "select",
            id: "select",
            size: 40,
            header: ({ table }) => {
                return (
                    <div className="w-[30px] flex justify-center items-center ">
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
            header: "Package ID",
            className: "text-xs",
            size: 40,
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                            className=''>{`${row.original.tracking_id}`}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "customer_name",
            header: "Customer",
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap">
                        <span className='text-[10px] leading-3 tracking-wider  '
                            style={{ fontFamily: 'roboto' }}
                        >{`${row.original.customer_id}`}</span>
                        <span>{`${row.original.customer_name}`}</span>
                    </div>
                )
            }

        },
        {
            accessorKey: "address",
            header: "Origin",
            cell: ({ row }) => {
                const countryCode = row.original.country_code_arrival ? row.original.country_code_arrival.substring(0, 2).toLowerCase() : '';
                console.log("🚀 ~ PackageDetails ~ countryCode:", countryCode)
                return (
                    <>
                        {
                            row.original.warehouse_name_arrival === null && row.original.warehouse_name_arrival === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-1 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>
                                                {`- ${row.original.warehouse_name_arrival} WH`}
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
            header: "Bin",
            size: 50,
            cell: ({ row }) => {
                return (
                    <>
                        {
                            row.original.bin_location === null || row.original.bin_location === "Undefined" || row.original.bin_location === "undefined" ?
                                (
                                    <>
                                        <p className="text-xs">-</p>
                                    </>
                                ) : (
                                    <>
                                        <p
                                            style={{ fontFamily: 'roboto' }}
                                            className="text-xs number tabular-nums">{row.original.bin_location}</p>
                                    </>
                                )
                        }
                    </>
                )
            }
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
                                    variant="tableBlue"
                                    size="tableIcon"
                                    className={`w-max px-[10px] h-[20px] gap-1`}
                                >
                                    <p className="text-[11px] text-myBlue">Details</p>
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
            sorting,
            rowSelection,
            pagination,
            query,
        },

    });

    const handlerDeleteOpen = (data) => {
        setOpenDelete(true);
        setPackageID(Array.isArray(data) ? data : [data]);
    }

    const selectedTable = table.getSelectedRowModel().rows.map(row => row.original.tracking_id);
    const reloadData = () => {
        setSkeleton(true)
        setReloadTrigger(!reloadTrigger)
        setRowSelection({});
    }
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
