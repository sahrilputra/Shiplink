'use client'
import React, { useState, useEffect } from "react";
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
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
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
import { MoreHorizontalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CountryMenus } from "../../components/menus/CountryMenus";
import { CreateNewCountry } from "./dialog/CreateNewCountry";
import { EditCountryDialog } from "./dialog/EditCountry";
import { Badge } from "@/components/ui/badge";
import { DeleteCountryDialog } from "./dialog/DeleteCountry";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export function CountriesTabled({ }) {
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [country, setCountry] = useState([]);
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewCountryDialog, setOpenNewCountryDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [deleteID, setDeleteID] = useState(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/config/countries/list`,
                query
            );
            const data = await response.data;
            setCountry(data.country);
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

    const handleEditClicked = (row) => {
        setSelectedRowData(row.original);
        setOpenEditDialog(true)
    }

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
            accessorKey: "country_name",
            header: "Country",
            className: "text-xs",
        },
        {
            accessorKey: "country_code",
            header: "Country Code",
        },
        {
            accessorKey: "country_numeric",
            header: "Numeric",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <Badge variant={`${row.original.status === "Disable" ? "redStatus" : "active"}`}>{row.original.status}</Badge>
                );
            }
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (

                    <div key={row.id} className="flex flex-row gap-2">
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-[3px] w-max px-[6px] h-[25px]`}
                            onClick={() => handleEditClicked(row)}
                        >
                            <p className="text-[11px]">Edit</p>
                        </Button>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="tableBlue"
                                    size="tableIcon"
                                    className={`rounded-sm w-max px-[5px] h-[25px]`}
                                >
                                    <MoreHorizontalIcon width={15} height={15} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="text-xs" side="left" align="left">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="text-xs text-myBlue">
                                        See All Province With this coutnry
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handlerDelete(row.original.country_code)}
                                        className="text-xs text-red-700">
                                        Delete This Province
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        }
    ]


    const table = useReactTable({
        data: country,
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


    const handlerDelete = (item) => {
        setDeleteID(item)
        setOpenDeleteDialog(true)
    }

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
    const reloadData = () => {
        fetchData();
    };

    return (
        <>
            <DeleteCountryDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} deleteID={deleteID} />
            <CreateNewCountry open={openNewCountryDialog} setOpen={setOpenNewCountryDialog} reloadData={reloadData} />
            <EditCountryDialog key={selectedRowData?.country_id} open={openEditDialog} setOpen={setOpenEditDialog} data={selectedRowData} reloadData={reloadData} />
            <Table className=" rounded-md">
                <TableHeader className="text-sm bg-white text-black rounded-md ">
                    <TableHead colSpan={7} className="p-4  border border-zinc-300 rounded-md" >
                        <div className="flex flex-row justify-between rounded-md">
                            <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Search..."
                                        className="pr-8 pl-2 text-xs border border-zinc-300"
                                        onChange={handleSearchChange}

                                    />
                                    <div className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 right-3 text-xs"  >
                                        <SearchIcon
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </div>
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
                                    variant="secondary"
                                    size="sm"
                                    className="px-5"
                                    onClick={() => setOpenNewCountryDialog(true)}
                                >
                                    <p className=" text-xs">Add New Province </p>
                                </Button>
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
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
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={row.isLast ? "w-[30px]" : row.isFirst ? "w-[50px]" : ""}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={`${cell.isLast ? "w-[30px]" : cell.isFirst ? "w-[50px]" : ""} text-xs `}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            {
                                loading ? (
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Waiting Data
                                    </TableCell>
                                ) : (
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                )
                            }

                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </>
    )
}
