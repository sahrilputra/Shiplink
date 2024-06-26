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
import { DropdownMenus } from "./menus/DropdownMenus";
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/searchBar";
import { DatePickerWithRange } from "@/components/date/DateRangePicker";
import { AddService } from "./dialog/AddService";
import { HistoryDialog } from "./dialog/HistoryDialog";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { MoreHorizontalIcon, History } from "lucide-react";
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton";

export function ServicesTabled({ data, isOpen, setOpen, handlerEdit, handlerDelete, id = "C001" }) {

    const [tableData, setTableData] = useState([]);
    console.log("🚀 ~ ServicesTabled ~ tableData:", tableData)
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [openHistory, setOpenHistory] = useState(false);
    const [openService, setOpenService] = useState(false);
    const fetchDataList = async () => {
        setIsSkeleton(true);
        try {
            const response = await axios.post(
                `/api/admin/config/services/setting_list`,
                {
                    id: id
                }
            )
            console.log("🚀 ~ fetchDataList ~ response:", response.data)
            const responseData = await response.data.data;
            setTableData(responseData);
            setIsSkeleton(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDataList();
    }, [id])

    const reloadTable = () => {
        fetchDataList();
    }

    const columns = [
        {
            accessorKey: "service_id",
            header: "ID",
            className: "text-xs",
            size: 50,
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{row.original.service_id}
                    </span>
                )
            }
        },
        {
            accessorKey: "service",
            header: "Description",
        },
        {
            accessorKey: "price",
            header: "Price",
            size: 50,
            cell: ({ row }) => {
                return (
                    <span
                        style={{ fontFamily: 'roboto' }}
                        className=''>{`$ ${row.original.price}`}
                    </span>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2 items-center">
                        <div className={`w-3 h-3 rounded-full  ${row.original.status === "Active" ? "bg-green-200/90 border border-green-600" : "bg-red-300/90 border border-red-800"}`}></div>
                        <p className="text-xs">{row.original.status}</p>
                    </div>
                )
            }
        },
        {
            id: "Action",
            header: "Action",
            size: 20,
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button
                            disabled={row.original.status === "Active" ? true : false}
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max  px-[5px] h-[20px]`}
                            onClick={() => handleActive(row.original.service_id)}
                        >
                            <p className="text-[11px]">Active</p>
                        </Button>
                        <DropdownMenus
                            key={row.original.service_id}
                            id={row.original.id}
                            status={row.original.status}
                            serviceID={row.original.service_id}
                            reload={reloadTable}
                        />
                    </div>
                );
            },
        }
    ]


    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const table = useReactTable({
        data: tableData,
        columns,
        defaultColumn: {
            width: "auto",
        },
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
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };

    const handleActive = (itemID) => {
        console.log("🚀 ~ handleActive ~ itemID:", itemID)
        tableData.map(async (item, index) => {
            console.log("🚀 ~ handleActive ~ item:", item.service_id, item.status)
            console.log("🚀 ~ handleActive ~ item:", index)
            try {
                const response = await axios.post(
                    `/api/admin/config/services/set_data`, {
                    id: item.id,
                    idconf: item.idconf,
                    service_id: item.service_id,
                    price: item.price,
                    status: item.service_id === itemID ? "Active" : "Disabled",
                    action: "edit"
                }
                );
                console.log("🚀 ~ handleActive ~ response", response)

            } catch (error) {
                console.log(error)
            }
            reloadTable();
        });

    }

    return (
        <>
            <HistoryDialog id={id} setOpen={setOpenHistory} open={openHistory} />
            <AddService open={openService} setOpen={setOpenService} id={id} reload={reloadTable} />
            <div className=" w-full px-[15px] pt-5 pb-5 bg-white rounded border border-neutral-200 flex-col justify-start items-start inline-flex gap-[10px]">
                <div className="w-full items-center flex flex-row justify-between gap-2">
                    <div className="">
                        <p>{id}</p>
                    </div>
                    <div className="w-full gap-3 flex flex-row justify-end">
                        <Button
                            variant="secondary"
                            size="xs"
                            className="text-xs flex flex-row gap-2"
                            onClick={() => setOpenHistory(true)}
                        >
                            <History height={12} width={12} />
                            <p>History</p>
                        </Button>
                        <Button
                            variant="secondary"
                            size="xs"
                            className="text-xs"
                            onClick={() => setOpenService(true)}
                        >
                            <p>Add Service</p>
                        </Button>
                    </div>

                </div>
                <Table>
                    <TableHeader className="text-sm" >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <>
                                {headerGroup.headers.map((header, index) => {
                                    const isLastHeader = index === headerGroup.headers.length - 1;
                                    const isFirstHeader = index === 0;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: header.getSize() }}
                                            className={` text-xs`}
                                        >
                                            {/* ${isLastHeader ? "w-[50px] " : isFirstHeader ? "w-[50px]" : ""} */}
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
                                                    className={`${columnIndex === columns.length - 1 ? "w-[50px]" : columnIndex === 0 ? "w-[50px]" : ""} text-xs`}
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
                                <>
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`${row.isLast ? "w-[50px]" : row.isFirst ? "w-[50px]" : ""} `}
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
                                </>
                            ))

                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
