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
import { MoreHorizontalIcon } from "lucide-react"
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
        limit: 0,
        index: 0
    });
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/list`,
                query
            );
            const data = await response.data;
            setCustomer(data.customer);
            setIsSkeleton(false);
            setLoading(false)
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
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
        },
        {
            accessorKey: "customer_name",
            header: "Customer Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
        },
        {
            accessorKey: "customer_plans",
            header: "Membership",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
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
                        <SearchBar />
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
                                        key={header.id}
                                        className={`${isLastHeader ? "w-[30px] " : isFirstHeader ? "w-[50px]" : ""} text-xs`}
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

            <div className="flex justify-end w-full items-end py-3">
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
