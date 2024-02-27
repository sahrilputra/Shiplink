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
import { ArrowDownV2Icons, FilterIcons } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { DeleteIcons } from "@/components/icons/iconCollection";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios'
import { DeleteSequences } from "../dialog/DeleteSequences";
import { EditSelectedNumber } from "../dialog/EditSelectedNumber";
export function PARSTable({ }) {

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [codeList, setCodeList] = useState([])
    const [deleteID, setDeleteID] = useState([]);
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [editID, setEditID] = useState(null)
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/Pars/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setCodeList(data.sequence);
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

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
            accessorKey: "type",
            header: "PARS / PAPS Number",
            className: "text-xs",
        },
        {
            accessorKey: "sequence_range",
            header: "Code Range",
        },
        {
            accessorKey: "carrier_code",
            header: "Carrier Code",
        },
        {
            accessorKey: "date_created",
            header: "Create Date",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => handlerEdit(row.original)}
                        >
                            <p className="text-xs">Edit</p>
                        </Button>

                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max px-[5px] h-6`}
                            onClick={() => handlerDelete(row.original.id)}
                        >
                            <DeleteIcons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  `} />
                        </Button>

                    </div>
                )
            },
        }
    ]


    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const table = useReactTable({
        data: codeList,
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

    })

    const handlerDelete = (data) => {
        setOpenDelete(true)
        setDeleteID(data)
    }
    const handlerEdit = (data) => {
        setOpenEdit(true)
        setEditID(data)
    }

    const reloadData = async () => {
        try {
            await fetchData();
            setRowSelection({}); // Menetapkan kembali objek rowSelection menjadi kosong
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const selectedRowID = table.getSelectedRowModel().rows.map(row => row.original.id);
    return (
        <>
            <EditSelectedNumber open={openEdit} setOpen={setOpenEdit} data={editID} reload={reloadData}/>
            <DeleteSequences open={openDelete} setOpen={setOpenDelete} deleteID={deleteID} reloadData={reloadData} />
            <div className="text-sm bg-white text-black border border-zinc-300 rounded-md">
                <div className="p-4  " >
                    <div className="flex flex-row justify-between rounded-md">
                        <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
                            <SearchBar />
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
                                className="w-[100px]"
                                onClick={() => handlerDelete(selectedRowID)}
                                disabled={Object.keys(rowSelection).length === 0} // Check if any item is checked
                            >
                                <p className=" text-xs">Delete</p>
                            </Button>
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
                <div className="flex justify-end w-full items-end p-4">
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
        </>
    )
}
