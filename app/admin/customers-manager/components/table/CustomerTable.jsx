'use client'
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
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
import { Button } from "@/components/ui/button"
import { FilterIcons } from "@/components/icons/iconCollection";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import axios from "axios";
import NextLink from "next/link";
import { Loaders } from "@/components/ui/loaders";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteCustomer } from "../dialog/DeleteCustomer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon } from "lucide-react"
import CreateNewCustomer from "../dialog/CreateNewCustomer";
import { Dialog } from "@/components/ui/dialog";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast";
import { TableMembership } from "@/components/membership/TableMembership";

export function CustomerTable({ data, open, setOpen }) {
    const { toast } = useToast();
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [customerID, setCustomerID] = useState(null);
    const [rowSelection, setRowSelection] = React.useState({})
    const [openDelete, setOpenDelete] = useState(false)
    const [sorting, setSorting] = React.useState([])
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

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/list`,
                {
                    ...query,
                    page: pagination.pageIndex + 1,
                    limit: pagination.pageSize,
                }
            );
            const data = await response.data;
            console.log("🚀 ~ fetchData ~ data:", data)
            setCustomer(data.customer);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);


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


    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value,
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

    const handleCopyCustomerId = (customerId) => {
        navigator.clipboard.writeText(customerId)
        toast({
            title: `${customerId} copied to clipboard`,
            description: "You can now paste it to your desired location",
            status: 'success',
        });
    };

    const handlerVerified = async (customer_id, status) => {
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/setVerified`,
                {
                    customer_id: customer_id,
                    status: status
                }
            );
            const data = await response.data;
            if (data.status) {
                toast({
                    title: "Customer Verified",
                    description: data.message,
                    status: 'success',
                });
                fetchData();
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    status: 'error',
                });
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };



    const columns = [
        {
            accessorKey: "customer_id",
            header: "Unit ID",
            className: "text-xs",
            size: 30,
            cell: ({ row }) => {
                return (
                    <p
                        className="text-xs"
                        style={{ fontFamily: 'roboto' }}
                    >
                        {row.original.customer_id}
                    </p>
                )
            },
        },
        {
            accessorKey: "customer_name",
            header: "Customer Name",
            size: 50,
        },
        {
            accessorKey: "email",
            header: "Email",
            size: 59,
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
            cell: ({ row }) => {
                return (
                    <p
                        className="text-xs"
                        style={{ fontFamily: 'roboto' }}
                    >
                        {row.original.phone_number}
                    </p>
                )
            },
        },
        {
            accessorKey: "customer_plans",
            header: "Membership",
            size: 50,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-center">
                        <div className="w-[110px]">
                            <TableMembership plans={row.original.customer_plans || "Free"} />
                        </div>
                    </div>
                )
            }
        },
        {
            id: "Action",
            header: "Action",
            size: 50,
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2 w-50">
                        <NextLink
                            className="focus:outline-none focus:ring-0 focus:border-transparent"
                            href={`/admin/customers-manager/${row.original.customer_id}`}>
                            <Button
                                variant="tableBlue"
                                size="tableIcon"
                                className={`w-max px-[10px] h-[20px]`}
                            >
                                <p className="text-[11px] text-myBlue">Details</p>
                            </Button>
                        </NextLink>
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="tableBlue"
                                        size="tableIcon"
                                        className={`rounded-sm w-max px-[5px] h-[20px]`}
                                    >
                                        <MoreHorizontalIcon width={15} height={15} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side={"left"} sideOffset={2}>
                                    <DropdownMenuItem
                                        onClick={() => handleCopyCustomerId(row.original.customer_id)}
                                    >
                                        <p className="text-xs text-myBlue">Copy Customer ID</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            handlerVerified(row.original.customer_id, "active")
                                        }}
                                    >
                                        <p className="text-xs">Verified Customer</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <NextLink
                                            className="focus:outline-none focus:ring-0 focus:border-transparent"
                                            href={`/admin/customers-manager/${row.original.customer_id}`}>
                                            <p className="text-xs">Customer Details</p>
                                        </NextLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handlerDelete(row.original.customer_id)}
                                    >
                                        <p className="text-xs text-red-700">Delete</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Dialog>
                    </div>
                )
            },
        }
    ]
    const handlerDelete = (item) => {
        setOpenDelete(true)
        setCustomerID(item)
    }

    const table = useReactTable({
        data: customer,
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

    })




    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }

    const toggleOpenDialog = () => {
        setOpen(!open)
    }
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };
    const reloadData = () => {
        fetchData();
    };

    return (
        <>
            {/* <Loaders /> */}
            <DeleteCustomer open={openDelete} setOpen={setOpenDelete} reloadData={reloadData} deleteID={customerID} />
            <CreateNewCustomer open={isCreateOpen} setOpen={setIsCreateOpen} reload={reloadData} />
            <div className="text-sm bg-white text-black pb-[10px]">
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
                        {/* <DatePickerWithRange className={"text-black"} /> */}
                    </div>
                    <div className="">
                        <Button
                            variant="destructive"
                            size="sm"
                            className="px-5"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            <p className=" text-xs">Create New Customer</p>
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="border border-zinc-300 rounded-sm">

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
                                        className={`${isLastHeader && 'w-30'} text-xs`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                        {console.log(header.column.columnDef.header)}
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
                                                <Skeleton className={"w-full rounded h-[25px]"} />
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
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={`${row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        style={{ width: `${cell.column.getSize()}px` }}
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
                    of{" "}
                    <div className="flex flex-row gap-1">
                        <strong>
                            {table.getFilteredRowModel().rows.length}
                        </strong>
                        <p className="text-nowrap"> row(s) selected.</p>
                    </div> */}
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
    )
}
