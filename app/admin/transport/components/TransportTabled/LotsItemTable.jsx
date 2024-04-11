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
import { addDays, format } from "date-fns";
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { EditLotsDialog } from "../AssignLotsDialog/EditLotsDialog";
import { LotsMoreMenusDropDrown } from "../menus/LotsMoreMenus";
import { ExpandedLotsData } from "./ExpandedLotsData";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { DeleteLotsDialog } from "../DeleteDialog/DeleteLotsDialog";
import { CreateNewLotsDialog } from "../AssignLotsDialog/CreateNewLotsDialog";

export function LotsItemsTable({ isOpen, setOpen }) {
    const [isEditDialog, setEditDialog] = useState(false);

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [openNewDialog, setOpenNewDialog] = useState(false)
    const [lots, setLots] = useState([]);
    console.log("🚀 ~ LotsItemsTable ~ lots:", lots)
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [dataLots, setDataLots] = useState({})
    const [lotsIDs, setLotIDs] = useState();
    const [openDelete, setOpenDelete] = useState(false);

    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    console.log("🚀 ~ LotsItemsTable ~ date:", date)

    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 1,
        limit: 10,
        index: 0,
    });
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setLots(data.lots);
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
        // const intervalId = setInterval(fetchData, 3000); 
        // return () => clearInterval(intervalId);
        setExpandedRows([])
    }, [query]);


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
    const columns = [

        {
            accessorKey: "lots_id",
            header: "Lots ID",
            className: "text-xs",
            cell: ({ row }) => {
                return (
                    <div
                        className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                        >
                            {row.original.lots_id}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "label",
            header: "Lots Labels",
        },
        {
            accessorKey: "location",
            header: "Current Location",
            size: 80,
            cell: ({ row }) => {
                const countryCode = row.original.country_code_position ? row.original.country_code_position.substring(0, 2).toLowerCase() : '';
                return (
                    <>
                        {
                            row.original.country_code_position === null && row.original.country_code_position === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>
                                                {`- ${row.original.warehouse_name_position}`}
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
            size: 80,
            cell: ({ row }) => {
                const countryCode = row.original.destination ? row.original.destination.substring(0, 2).toLowerCase() : '';
                return (
                    <>
                        {
                            row.original.destination === null && row.original.destination === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-2 items-center flex-wrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>
                                                {`- ${row.original.destination}`}
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
            accessorKey: "pickup_schedule",
            header: "Pickup Schedule",
            size: 80,
            cell: ({ row }) => {
                return (
                    <div
                        className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                        >{row.original.pickup_schedule}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "total_items",
            header: "Package",
            size: 30,
            cell: ({ row }) => {
                return (
                    <div
                        className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                        >{row.original.total_items !== 0 ? row.original.total_items : '-'}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 50,
        },
        {
            size: 50,
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex w-[130px] flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => handleEditOpen(row.original)}
                        >
                            <p className="text-[11px]">Edit Lot</p>
                        </Button>
                        <LotsMoreMenusDropDrown
                            key={row.original.lots_id}
                            data={row.original}
                            dataID={row.original.lots_id}
                            lots_docs={row.original.documents}
                            handleDeleteLost={handleDeleteLost}
                        />
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                            onClick={() => toggleRow(row.id)}

                        >
                            <ArrowDownV2Icons
                                width={15}
                                height={15}
                                className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[row.id] ? "rotate-180" : ""
                                    }`}
                            />
                        </Button>
                    </div>
                );
            },
        },
    ]
    const table = useReactTable({
        data: lots,
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
        columnResizeMode: "onChange",
        state: {
            sorting,
            rowSelection,
            pagination,
            query,
        },

    });

    const reloadData = () => {
        setIsSkeleton(true)
        fetchData();
    }
    const handleEditOpen = (item) => {
        setEditDialog(true)
        setDataLots(item)
    }
    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };
    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    //     const toggleRow = (index) => {
    //         const newExpandedRows = { ...expandedRows };
    //         newExpandedRows[index] = !newExpandedRows[index];
    //         setExpandedRows(newExpandedRows);
    //     };
    // }
    const toggleRow = (index) => {
        const newExpandedRows = {};
        if (expandedRows[index]) {
            setExpandedRows({});
        } else {
            newExpandedRows[index] = true;
            setExpandedRows(newExpandedRows);
        }
    }

    const handleDeleteLost = (lotsID) => {
        setOpenDelete(true)
        setLotIDs(lotsID)
    }

    const toggleOpenChange = () => {
        setOpen(true)
    }
    return (
        <>
            <CreateNewLotsDialog
                open={openNewDialog}
                setOpen={setOpenNewDialog}
                reload={reloadData}
            />
            <DeleteLotsDialog setOpen={setOpenDelete} open={openDelete} deleteId={lotsIDs} reload={reloadData} />
            <EditLotsDialog open={isEditDialog} setOpen={setEditDialog} data={dataLots} reload={reloadData} />
            <div className="w-full flex flex-row justify-between">
                <div className="wrap inline-flex gap-[10px] justify-evenly items-center pb-3">
                    <SearchBar handleSearch={handleSearchChange} />
                    <Button
                        variant="filter"
                        size="filter"
                        className='border border-zinc-300 flex items-center rounded'>
                        <FilterIcons
                            className=""
                            fill="#CC0019" />
                    </Button>
                    <DatePickerWithRange className={"text-black"} mySetdate={handleSetDate} />
                </div>

                <div className="">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="px-10"
                        onClick={() => setOpenNewDialog(true)}
                    >
                        <p className=" text-xs">New Lots</p>
                    </Button>
                </div>
            </div >

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
                                        style={{ width: `${header.getSize()}px}` }}
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

                    {isSkeleton || !table?.getRowModel().rows?.length ? (
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
                        table.getRowModel().rows.map((row) => (
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""} cursor-pointer`}
                                    onClick={() => toggleRow(row.id)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs ${expandedRows[row.id] && "bg-blue-200 hover:bg-blue-200 "} `}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {
                                    expandedRows[row.id] && (
                                        <>
                                            <TableRow >
                                                <TableCell colSpan={8} className="w-full p-1 px-[10px] py-[10px] bg-blue-100">
                                                    <ExpandedLotsData data={row.original} lotsID={row.original.lots_id} key={row.original.lots_id} setExpandedRows={setExpandedRows} />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                }
                            </>
                        ))
                    )}
                </TableBody>

            </Table>
            <div className="flex justify-between w-full items-center mt-3 pb-2">
                <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">
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
