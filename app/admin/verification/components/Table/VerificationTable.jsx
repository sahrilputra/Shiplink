'use client'
import React, { useState } from "react";
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
import { ExpandedTable } from "./ExpandedTable";
import { ArrowDownV2Icons } from "@/components/icons/iconCollection";
import { VerifiedStatus } from "../status/VerifiedStatus";
import { EditForms } from "./EditForms";
import { ImageTable } from "./ImageTable";
import { Edit } from "./Edit";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Form,
} from "@/components/ui/form"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnSizing,
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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";


export function VerificationTable(
    {
        data,
        isOpen,
        setOpen,
        isSkeleton,
        reloadData,
        setQuery,
        pagination,
        setPagination,
        rowTotalData,
        setRowTotalData,
        totalPage,
        pageIndex,
    }
) {
    console.log("🚀 ~ pageIndex:", pageIndex)
    console.log("🚀 ~ pagination:", pagination)
    console.log("🚀 ~ rowTotalData:", rowTotalData)
    console.log("🚀 ~ totalPage:", totalPage)
    console.log("🚀 ~ VerificationTable ~ data:", data)
    // Form Init


    // console.log("Declare Content", data.map(item => item.content.length))
    // const [dataLength, setDataLength] = useState(data.map(item => item.content.length))
    // console.log('dataLength', dataLength)
    // fields.length = dataLength;
    // fields.length = data.map(item => item.content.length);

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});
    const columns = [
        {
            accessorKey: "tracking_id",
            header: "Tracking ID",
            className: "text-xs",
            cell: ({ row }) => {
                return (
                    <div className="text-xs"
                        style={{ fontFamily: 'roboto' }}
                    >
                        {row.original.tracking_id}
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
                                        <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>-</span>
                                            <span className='text-nowrap'>WH  {`${row.original.warehouse_name_arrival}`}</span>

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
                                        <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>-</span>
                                            <span className='text-nowrap'>WH  {`${row.original.warehouse_name_destination}`}</span>
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
            header: "Last Update",
            size: 150,
            cell: ({ row }) => {
                return (
                    <div
                        className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                        >{row.original.updated_at}</span>
                    </div>
                )
            }
        },
        {

            accessorKey: "status",
            header: ({ getSorting }) => {
                return (
                    <div
                        className="cursor-pointer select-none text-center w-[100%] mx-auto flex flex-row items-center"
                        onClick={() => {
                            setSorting([{ id: "status", desc: !isSortedDesc }]);
                            setIsSortedDesc(!isSortedDesc);
                        }}
                    >
                        <p>
                            Customs Status
                        </p>
                        {isSortedDesc ? <ChevronDown className="text-white" width={15} /> : <ChevronUp className="text-white" width={15} />}
                    </div>
                );
            },
            cell: ({ row }) => {
                return (
                    <div className="text-center text-xs w-[] " >
                        <VerifiedStatus param={row.original.status} />
                    </div>
                )
            },
        },
        {
            id: "Action",
            header: "Action",
            size: 30,
            cell: ({ row }) => {
                return (
                    <div className="w-[60px]" key={row}>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Button
                                onClick={() => toggleRow(row.id)}
                                variant="tableBlue"
                                size="tableIcon"
                                className={` w-max px-[5px] h-[25px]`}
                            >
                                <ArrowDownV2Icons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue  ${expandedRows[row.id] ? 'rotate-180' : ''}`} />
                            </Button>
                        </div>
                    </div>
                )
            },
        }
    ]
    // ${expandedRows[index] ? 'rotate-180' : ''}
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
            pagination,
        },
    });
    console.log("🚀 ~ rowTotalData.page_total:", rowTotalData.page_total)

    const [expandedRow, setExpandedRow] = useState(null);

    const [newContet, setNewContent] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [editCount, setEditCount] = useState(1);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        const newExpandedRows = {};
        if (expandedRows[index]) {
            setExpandedRows({});
        } else {
            newExpandedRows[index] = true;
            setExpandedRows(newExpandedRows);
        }
    };
    return (
        <>
            <Table className=" rounded-md">
                <TableHeader className="text-sm">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <>
                            {headerGroup.headers.map((header, index) => {
                                const isLastHeader = index === headerGroup.headers.length - 1;
                                const isFirstHeader = index === 0;
                                return (
                                    <TableHead
                                        style={{ width: `${header.getSize()}px` }}
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
                                                style={{ width: columns.width }}
                                                className={`  text-xs`}
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
                                            style={{ width: columns.width }}
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[60px]" : cell.isFirst ? "w-[50px]" : ""} text-xs  ${expandedRows[row.id] && "bg-blue-100 hover:bg-blue-100"}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {expandedRows[row.id] && (
                                    <>
                                        <TableRow key={`expanded_${row.original.id}`} className="bg-blue-50 hover:bg-blue-50">
                                            <TableCell className="font-medium" colSpan={7}>
                                                <div className="w-[80%] flex justify-center items-center mx-auto py-3">
                                                    <ImageTable images={row.original.images} />
                                                </div>
                                                {
                                                    isEdit ? (
                                                        <>
                                                            <Edit
                                                                data={row.original.content}
                                                                cancel={toggleCancel}
                                                                trackingID={row.original.tracking_id}
                                                                reload={reloadData}
                                                            />
                                                        </>
                                                    ) : (
                                                        <ExpandedTable content={row.original.content} item={row.original} edit={toggleEdit} trackingID={row.original.tracking_id} reloadData={reloadData} image={row.original.images} setExpandedRows={setExpandedRows} />
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow >
                                    </>
                                )}
                            </>
                        ))
                    )}
                </TableBody>
            </Table >
            <div className="flex justify-between w-full items-center mt-4 pb-2">
                <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">

                </div>
                <Pagination className={'flex justify-end w-full items-center gap-2 '}>
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
    )
}
