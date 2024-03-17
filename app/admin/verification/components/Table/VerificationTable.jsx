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
import { Skeleton } from "@/components/ui/skeleton";
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
import { ChevronDown, ChevronUp } from "lucide-react";

export function VerificationTable({ data, isOpen, setOpen, isSkeleton, reloadData }) {

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
        },
        {
            accessorKey: "customer_name",
            header: () => {
                return (
                    <div
                        className="cursor-pointer select-none"
                        onClick={() => {
                            setSorting([{ id: "tracking_id", desc: !isSortedDesc }]);
                            setIsSortedDesc(!isSortedDesc);
                        }}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            Customer Name
                            <>
                                {isSortedDesc ? <ChevronDown fill="#fffff" width={15} /> : <ChevronUp fill="#fffff" width={15} />}
                            </>
                        </div>

                    </div>
                );
            },
        },
        {
            accessorKey: "address",
            header: "Origin",
        },
        {
            accessorKey: "destination",
            header: "Destination",
        },
        {
            accessorKey: "updated_at",
            header: "Last Update",
            width: 200,
        },
        {
            accessorKey: "status",
            width: 100,
            header: ({ getSorting }) => {
                return (
                    <div
                        className="cursor-pointer select-none w-[100%] text-center"
                        onClick={() => {
                            setSorting([{ id: "status", desc: !isSortedDesc }]);
                            setIsSortedDesc(!isSortedDesc);
                        }}
                    >
                        <div className="flex flex-row gap-2 items-center text-center">
                            Customs Status
                            <>
                                {isSortedDesc ? <ChevronDown fill="#fffff" width={15} /> : <ChevronUp fill="#fffff" width={15} />}
                            </>
                        </div>
                    </div>
                );
            },
            cell: ({ row }) => {
                return (
                    <div className="text-center text-xs w-[150px] " >
                        <VerifiedStatus param={row.original.status} />
                    </div>
                )
            },

        },
        {
            id: "Action",
            header: "Action",
            width: 50,
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

    const table = useReactTable({
        data: data,
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
                                            key={cell.id}
                                            style={{ width: cell.column.columnDef.width }}
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
                                                        <EditForms counter={editCount} data={row.original.content} edit={toggleEdit} cancel={toggleCancel} trackingID={row.original.tracking_id} reloadData={reloadData} />
                                                    ) : (
                                                        <ExpandedTable content={row.original.content} item={row.original} edit={toggleEdit} trackingID={row.original.tracking_id} reloadData={reloadData} />
                                                    )
                                                }

                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow className="bg-blue-100 hover:bg-blue-100 ">
                                            <TableCell className="font-medium p-0 h-7 px-5 py-2" colSpan={7}>
                                                {
                                                    isEdit ? (
                                                        <EditMode cancel={toggleCancel} increaseContent={setEditCount} />
                                                    ) : (
                                                        <TableAction edit={toggleEdit} item={row.original} />
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow> */}
                                    </>
                                )}
                                {/* {expandedRows[row.id] && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="w-full p-1 px-[20px] py-[10px] bg-blue-50">
                                            <BrokerDeclareContent data={row.original.content} details={row.original} TrackingID={row.original.tracking_id} reload={reload} status={row.original.status} />
                                        </TableCell>
                                    </TableRow>
                                )} */}
                                {/* ${columnIndex === columns.length - 1 ? "w-[30px]" : columnIndex === 0 ? "w-[50px]" : ""} */}
                            </>
                        ))
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-end w-full items-end">
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
