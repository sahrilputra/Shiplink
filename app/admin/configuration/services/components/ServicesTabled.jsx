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


export function ServicesTabled({ data, isOpen, setOpen, handlerEdit, handlerDelete }) {

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
            accessorKey: "description",
            header: "Description",
            className: "text-xs",
        },
        {
            accessorKey: "status",
            header: "status",
        },
        {
            accessorKey: "fee",
            header: "fee",
        },
        {
            accessorKey: "date",
            header: "Last Change",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ value }) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max px-[6px] h-[25px]`}
                            onClick={() => handlerEdit()}
                        >
                            <p className="text-[11px]">Edit</p>
                        </Button>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max px-[5px] h-[25px]`}
                            onClick={() => handlerDelete()}
                        >
                            <MoreHorizontalIcon width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  `} />
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
        data,
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
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };
    // return (
    //     <Table className=" rounded-md ">
    //         <TableHeader className="text-sm bg-white text-black rounded-md ">
    //             <TableHead colSpan={7} className="py-4 rounded-md" >
    //                 <div className="flex flex-row justify-between rounded-md">
    //                     <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
    //                         <SearchBar />
    //                         <Button
    //                             variant="filter"
    //                             size="filter"
    //                             className='border border-zinc-300 flex items-center rounded'>
    //                             <FilterIcons
    //                                 className=""
    //                                 fill="#CC0019" />
    //                         </Button>
    //                     </div>
    //                     <div className="">
    //                         <Button
    //                             variant="secondary"
    //                             size="sm"
    //                             className="px-5"
    //                         >
    //                             <p className=" text-xs">Services History</p>
    //                         </Button>
    //                     </div>
    //                 </div>
    //             </TableHead>
    //         </TableHeader>
    //         <TableHeader className="text-sm">
    //             {table.getHeaderGroups().map((headerGroup) => (
    //                 <>
    //                     {headerGroup.headers.map((header, index) => {
    //                         const isLastHeader = index === headerGroup.headers.length - 1;
    //                         const isFirstHeader = index === 0;
    //                         return (
    //                             <TableHead
    //                                 key={header.id}
    //                                 className={`${isLastHeader ? "w-[30px] " : isFirstHeader ? "w-[50px]" : ""} text-xs`}
    //                             >
    //                                 {header.isPlaceholder
    //                                     ? null
    //                                     : flexRender(
    //                                         header.column.columnDef.header,
    //                                         header.getContext()
    //                                     )}

    //                                 {console.log(header.column.columnDef.header)}
    //                             </TableHead>
    //                         );
    //                     })}
    //                 </>
    //             ))}
    //         </TableHeader>
    //         <TableBody>
    //             {table.getRowModel().rows?.length ? (
    //                 table.getRowModel().rows.map((row) => (
    //                     <TableRow
    //                         key={row.id}
    //                         data-state={row.getIsSelected() && "selected"}
    //                         className={row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}
    //                     >
    //                         {row.getVisibleCells().map((cell) => (
    //                             <TableCell key={cell.id} className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs `}>
    //                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //                             </TableCell>
    //                         ))}
    //                     </TableRow>
    //                 ))
    //             ) : (
    //                 <TableRow>
    //                     <TableCell colSpan={columns.length} className="h-24 text-center">
    //                         No results.
    //                     </TableCell>
    //                 </TableRow>
    //             )}
    //         </TableBody>

    //     </Table>
    // )

    return (
        <Table className="rounded-md">
            <TableHeader className="text-sm bg-white text-black rounded-md">
                <TableHead colSpan={7} className="py-4 rounded-md">
                    <div className="flex flex-row justify-between rounded-md">
                        <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
                            <SearchBar />
                        </div>
                        <div className="">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="px-5"
                            >
                                <p className="text-xs">Services History</p>
                            </Button>
                        </div>
                    </div>
                </TableHead>
            </TableHeader>
            <TableHeader className="text-sm">
                {columns.map(column => (
                    <TableHead key={column.accessorKey} className="text-xs">
                        {column.header}
                    </TableHead>
                ))}
            </TableHeader>
            <TableBody>
                {data && data.service.map(service => (
                    <TableRow key={service.id}>
                        {columns.map(column => (
                            <TableCell key={column.accessorKey} className="text-xs">
                                {service[column.accessorKey]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
