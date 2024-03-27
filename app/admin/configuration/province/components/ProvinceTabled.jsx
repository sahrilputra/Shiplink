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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MoreHorizontalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { NewProvinceDialog } from "./dialog/NewProvinceDialog";
import { EditProvinceDialog } from "./dialog/EditProvince";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeletePronviceDialog } from "./dialog/DeletePronviceDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@radix-ui/react-dialog";
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckIcon } from 'lucide-react'

export function ProvinceTabled({ }) {
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [province, setProvince] = useState([]);
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [createNewDialogOpen, setCreateNewDialogOpen] = useState(false);
    const [open, setOpen] = useState(false)
    const [countryCode, setCountryCode] = useState("")
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [deleteID, setDeleteID] = useState([])
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [countryList, setCountryList] = useState([]);
    const [value, setValue] = useState("")

    const handleCommandChange = (e) => {
        setQuery({ ...query, keyword: e });
    }

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/config/countries/list`,
                query
            );
            const data = await response.data;
            setIsSkeleton(false)
            setCountryList(data.country);
            if (data === undefined || data === "undefined" || data === null || data === "null") {
                setCountryList([])
                fetchData()
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const reloadData = () => {
        fetchData();
        setRowSelection({});
    };

    useEffect(() => {
        const fetchProvince = async () => {
            setIsSkeleton(true)
            try {
                const response = await axios.post(
                    `/api/admin/config/province`,
                    {
                        keyword: "",
                        page: 0,
                        limit: 0,
                        index: 0,
                    }
                );
                const data = await response.data;
                console.log("DATA: ", data)
                setIsSkeleton(false)
                if (countryCode !== "") {
                    const filteredProvince = data.province.filter(prov => prov.country_code === countryCode);
                    setProvince(filteredProvince);
                } else {
                    // Jika tidak ada kode negara yang dipilih, set provinsi tanpa filter
                    setProvince([]);
                }
            } catch (error) {
                setIsSkeleton(false)
                console.log('Error:', error);
            }
        }
        fetchProvince();
    }, [countryCode])


    console.log("🚀 ~ ProvinceTabled ~ countryCode:", countryCode)

    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };

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
            accessorKey: "province_code",
            header: "Province Code",
        },
        {
            accessorKey: "province_name",
            header: "State / Province",
        },
        {
            accessorKey: "country_name",
            header: "Country",
            className: "text-xs",
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="" key={row.original.province_id}>
                        <div className="flex flex-row gap-2">
                            <Button
                                variant="tableBlue"
                                size="tableIcon"
                                className={`rounded-[3px] w-max px-[6px] h-[25px]`}
                                onClick={() => handleEditClicked(row)}
                            >
                                <p className="text-[11px]">Edit</p>
                            </Button>
                            {/* <ProvinceMenus province={row.original} />
                             */}
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
                                        {/* <DropdownMenuItem className="text-xs text-myBlue">
                                            See this Country In Country Tab
                                        </DropdownMenuItem> */}
                                        <DropdownMenuItem
                                            onClick={() => handlerDelete(row.original.province_code)}
                                            className="text-xs text-red-700">
                                            Delete This Province
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                )
            },
        }
    ]


    const table = useReactTable({
        data: province,
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

    });


    const handleEditClicked = (row) => {
        setSelectedRowData(row.original);
        setIsEditDialog(true)
    }

    const handlerDelete = (itemOrItems) => {
        if (Array.isArray(itemOrItems) && itemOrItems.length > 0) {
            setDeleteID(itemOrItems);
            setDeleteDialog(true);
        } else {
            setDeleteID([itemOrItems]);
            setDeleteDialog(true);
        }
    }


    const sortData = (field, direction) => {
        const sortedData = [...province];
        sortedData.sort((a, b) => {
            if (direction === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        setProvince(sortedData);
    };

    const removeSorting = () => {
        setSorting([]);
        fetchData(); // Memuat kembali data untuk mereset urutan ke aslinya
    };

    const selectedWarehouseIds = table.getSelectedRowModel().rows.map(row => row.original.province_code);


    return (
        <>
            <DeletePronviceDialog open={deleteDialog} setOpen={setDeleteDialog} deleteID={deleteID} reloadData={reloadData} />
            <NewProvinceDialog open={createNewDialogOpen} setOpen={setCreateNewDialogOpen} reloadData={reloadData} />
            <EditProvinceDialog key={selectedRowData?.province_id} open={isEditDialog} setOpen={setIsEditDialog} reloadData={reloadData} data={selectedRowData} />
            <Table className=" rounded-md">
                <TableHeader className="text-sm bg-white text-black rounded-md ">
                    <TableHead colSpan={7} className="p-4  border border-zinc-300 rounded-md" >
                        <div className="flex flex-row justify-between rounded-md">
                            <div className="wrap inline-flex gap-[10px]  justify-evenly items-center text-black">
                                <div className="">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[200px] justify-between text-xs px-2 h-[35px] shadow-none capitalize"
                                            >
                                                {
                                                    value ? value : "Select Country..."
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    onValueChange={(e) => handleCommandChange(e)}
                                                    placeholder="Search Country..."
                                                    className="h-9 text-xs" />
                                                <CommandEmpty>No Country found.</CommandEmpty>
                                                <ScrollArea className="h-[200px]">
                                                    <CommandGroup>
                                                        {countryList.map((item) => (
                                                            <CommandItem
                                                                key={item.country_name}
                                                                value={item.country_name}
                                                                className="text-xs"
                                                                onSelect={(currentValue) => {
                                                                    setCountryCode(item.country_code)
                                                                    setValue(currentValue === value ? "" : currentValue)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                {item.country_name}
                                                                <CheckIcon
                                                                    className={`ml-auto h-4 w-4 ${value.toLowerCase() === item.country_name.toLowerCase() ? "opacity-100" : "opacity-0"}`}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="">
                                {
                                    Object.keys(rowSelection).length === 0 ? (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="px-5"
                                            onClick={() => { setCreateNewDialogOpen(true) }}
                                        >
                                            <p className=" text-xs">Add New Province</p>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="w-[100px]"
                                            onClick={() => handlerDelete(selectedWarehouseIds)}

                                        >
                                            <p className=" text-xs">Delete</p>
                                        </Button>
                                    )
                                }

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
                                        Select Country to view States/Province
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
        </>
    )
}
