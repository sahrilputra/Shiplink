'use client'
import React, { use, useEffect, useState } from "react";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, ExternalLink, MoreHorizontalIcon, XIcon } from "lucide-react";
import NextLink from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
} from "@/components/ui/pagination"
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { AssingLotsDialog } from "../AssignLotsDialog/AssignToLotsDialog";
import { CreateNewLotsDialog } from "../AssignLotsDialog/CreateNewLotsDialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export function SingleItemsTable({ }) {

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openNewWarehouse, setOpenNewWarehouse] = useState(false);
    const [warehouse, setWarehouse] = useState([]);
    const [deleteID, setDeleteId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [filterDestination, setFilterDestination] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [selectedItemsID, setSelectedItemsID] = useState([])
    const [openAssignLots, setOpenAssignLots] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        lots_id: "",
        bins_id: "",
        asign_lot: "false",
        customer_id: "",
        country_origin: "",
        country_destination: "",
        warehouse_origin: "",
        warehouse_destination: "",
        warehouse_position: "",
        email: "",
        status: "",
        status_id: "0",
        sort_by: "updated_at",
        sort_type: "asc",
        page: 1,
        limit: 10,
        index: 0,
    });


    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/transport/package_list`,
                query
            );
            console.log("🚀 ~ fetchData ~ response:", response)
            const data = await response.data;
            console.log("🚀 ~ fetchData ~ data:", data)
            const filteredData = data.package_info.filter(item => item.lots_id === null);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setWarehouse(filteredData);
            setIsSkeleton(false);
            setRowSelection({});
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

    const [warehouseListData, setWarehouseData] = useState([]);
    const warehouseList = async () => {
        try {
            const response = await axios.post(
                `/api/admin/warehouse/list`,
                {
                    keyword: "",
                    page: 0,
                    limit: 0,
                    index: 0,
                }
            );
            console.log(response)
            const data = await response.data;
            setWarehouseData(data.warehouse);
            setIsSkeleton(false);
        } catch (error) {
            console.log("Erorr : ", error)
        }
    }

    const [statusListData, setStatusListData] = useState([]);
    const statusList = async () => {
        try {
            const response = await axios.get(
                `/api/admin/packages/status`
            );
            console.log("Status List : ", response)
            const data = await response.data;
            setStatusListData(data.data);
        } catch (error) {
            console.log("Erorr : ", error)
        }
    }

    useEffect(() => {
        warehouseList();
        statusList();
    }, [])




    const isCanAssign = (origin, destination, status) => {
        console.log("🚀 ~ isCanAssign ~ status:", status)
        if (origin === destination) {
            return true
        } else if (origin !== destination && status === 23 || status === 9) {
            return true
        } else {
            return false
        }
    }

    const [isASC, setIsASC] = useState({
        tracking_id: true,
        customer_name: true,
        origin: true,
        destination: true,
        location: true,
        status: true,
    });
    const handleSortPakcage_id = () => {
        setQuery({
            ...query,
            sort_by: "tracking_id",
            sort_type: isASC.tracking_id ? "asc" : "desc"
        });
        setIsASC({
            tracking_id: !isASC.tracking_id,
            customer_name: true,
            origin: true,
            destination: true,
            location: true,
            status: true,
        });
    }

    const handleSortCustomerName = () => {
        setQuery({
            ...query,
            sort_by: "customer_name",
            sort_type: isASC.customer_name ? "asc" : "desc"
        });
        setIsASC({
            tracking_id: true,
            customer_name: !isASC.customer_name,
            destination: true,
            status: true,
            location: true,
        });
    }

    const handleSortDestination = () => {
        setQuery({
            ...query,
            sort_by: "warehouse_destination",
            sort_type: isASC.destination ? "asc" : "desc"
        });
        setIsASC({
            tracking_id: true,
            customer_name: true,
            destination: !isASC.destination,
            status: true,
            location: true,
        });
    }

    const handleSortLocation = () => {
        setQuery({
            ...query,
            sort_by: "warehouse_position",
            sort_type: isASC.location ? "asc" : "desc"
        });
        setIsASC({
            tracking_id: true,
            customer_name: true,
            destination: true,
            location: !isASC.location,
            status: true,
        });
    }

    const handleSortStatus = () => {
        setQuery({
            ...query,
            sort_by: "status_id",
            sort_type: isASC.status ? "asc" : "desc"
        });
        setIsASC({
            tracking_id: true,
            customer_name: true,
            destination: true,
            location: true,
            status: !isASC.status
        });
    }

    const columns = [

        {
            accessorKey: "tracking_id",
            header: ({ row }) => {
                return (
                    <div
                        onClick={handleSortPakcage_id}
                        className="flex flex-row justify-between w-full items-center cursor-pointer">
                        <p>Tracking ID</p>
                        <ChevronDown className={`w-4 h-4 ${!isASC.tracking_id ? 'rotate-180' : ""}`} />
                    </div>
                )
            },
            className: "text-xs",
            size: 80,
            cell: ({ row }) => {
                return (
                    <div
                        className="text-xs flex flex-col flex-wrap number tabular-nums">
                        <span
                            style={{ fontFamily: 'roboto' }}
                        >
                            {row.original.tracking_id}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "customer_name",
            header: ({ row }) => {
                return (
                    <div
                        onClick={handleSortCustomerName}
                        className="flex flex-row justify-between w-full items-center cursor-pointer">
                        <p>Customer Name</p>
                        <ChevronDown className={`w-4 h-4 ${!isASC.customer_name ? 'rotate-180' : ""}`} />
                    </div>
                )
            },
            size: 150,
            cell: ({ row }) => {
                return (
                    <div className="text-xs flex flex-col flex-wrap">
                        <span className='text-[10px] leading-3 tracking-wider  '
                            style={{ fontFamily: 'roboto' }}
                        >
                            {`${row.original.customer_id}`}
                        </span>
                        <span>{`${row.original.customer_name}`}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "address",
            header: "Origin",
            size: 80,
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
                                        <div className="text-xs flex flex-row gap-2 items-center h-[20px] w-max flex-nowrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span>
                                                {`- ${row.original.warehouse_name_arrival} WH`}
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
            accessorKey: "Destination",
            header: ({ row }) => {
                return (
                    <div
                        onClick={handleSortDestination}
                        className="flex flex-row justify-between w-full items-center cursor-pointer">
                        <p>Destination</p>
                        <ChevronDown className={`w-4 h-4 ${!isASC.destination ? 'rotate-180' : ""}`} />
                    </div>
                )
            },
            size: 80,
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
                                        <div className="text-xs flex flex-row gap-2 items-center h-[20px] w-max flex-nowrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span className='text-nowrap'>
                                                {`- ${row.original.warehouse_name_destination} WH`} {`${row.original.services === "Hold pickup" ? "- HFP" : ""}`}
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
            accessorKey: "warehouse_current_position",
            header: "Location",
            size: 80,
            cell: ({ row }) => {
                const countryCode = row.original.country_code_position ? row.original.country_code_position.substring(0, 2).toLowerCase() : '';
                return (
                    <>
                        {
                            row.original.warehouse_name_position === null && row.original.warehouse_name_position === null ?
                                (
                                    <>
                                        -
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs flex flex-row gap-2 items-center h-[20px] w-max flex-nowrap">
                                            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="country icon" style={{ objectFit: 'fill', width: '25px', height: '25px' }} />
                                            <span className='text-nowrap'>
                                                {`- ${row.original.warehouse_name_position} WH`}
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
            accessorKey: "status",
            header: ({ row }) => {
                return (
                    <div
                        onClick={handleSortStatus}
                        className="flex flex-row justify-between w-full items-center cursor-pointer">
                        <p>Customs Status</p>
                        <ChevronDown className={`w-4 h-4 ${!isASC.status ? 'rotate-180' : ""}`} />
                    </div>
                )
            },
            size: 150,
        },
        {
            id: "Action",
            header: "Action",
            size: 100,
            cell: ({ row }) => {
                return (
                    <div className="w-max flex justify-center items-center" key={row}>
                        <div className="flex flex-row gap-2">
                            <NextLink href={`/admin/package-details/${row.original.tracking_id}`}>
                                <Button
                                    variant="ghost"
                                    className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                    <p>Details</p>
                                    <ExternalLink width={10} height={10} />
                                </Button>
                            </NextLink>
                            <Button
                                variant="tableBlue"
                                size="tableIcon"
                                disabled={isCanAssign(row.original.warehouse_name_arrival, row.original.warehouse_name_destination, row.original.status_id) ? false : true}
                                className={`w-max px-[10px] h-[25px]`}
                                onClick={() => toggleOpenChange([row.original.tracking_id])}
                            >
                                <p className="text-[11px]">Assign</p>
                            </Button>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "Select",
            id: "select",
            size: 30,
            cell: ({ row }) => {
                return (
                    <div className="w-[40px] flex items-center justify-center px-0">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                            disabled={isCanAssign(row.original.warehouse_name_arrival, row.original.warehouse_name_destination, row.original.status_id) ? false : true}
                        />
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: warehouse,
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
        defaultColumn: {
            size: "auto",
        },
        state: {
            sorting,
            rowSelection,
            pagination,
            query,
        },

    });
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
    const handlerDelete = (item) => {
        setDeleteId(item)
        setDeleteDialog(true)
    }

    const toggleOpenChange = (data) => {
        setOpenAssignLots(true)
        setSelectedItemsID(data)
    }

    const toggleOpenNewLots = () => {
        setOpenNewDialog(true)
    }
    const reloadData = () => {
        setIsSkeleton(true)
        setRowSelection({});
        fetchData();
    };

    const [filterOrigins, setFilterOrigins] = useState("");

    const handlerFilterOrigin = (e) => {
        setFilterOrigins(e)
        setQuery({
            ...query,
            warehouse_origin: e,
            page: 1,
            limit: 10,
            index: 0,
            sort_by: "updated_at",
            sort_type: "asc",
            asign_lot: "false",
        })
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })
        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })

    }
    const handleFilterDestination = (e) => {
        setFilterDestination(e)
        console.log("Filter Destination : ", e)
        setQuery({
            ...query,
            warehouse_destination: e,
            page: 1,
            limit: 10,
            index: 0,
            sort_by: "updated_at",
            sort_type: "asc",
            asign_lot: "false",
        })
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })
        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    }
    const handleFilterLocation = (e) => {
        setFilterLocation(e)
        console.log("Filter Destination : ", e)
        setQuery({
            ...query,
            page: 1,
            limit: 10,
            index: 0,
            warehouse_position: e,
            sort_by: "updated_at",
            sort_type: "asc",
            asign_lot: "false",
        })
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })
        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    }

    const handlerStatusChange = (e) => {
        setFilterStatus(e)
        console.log("Filter Status : ", e)
        setQuery({
            ...query,
            status: e,
            page: 1,
            limit: 10,
            index: 0,
            sort_by: "updated_at",
            sort_type: "asc",
            asign_lot: "false",
        })
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })
        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    }


    const handleRemoveFilter = () => {
        setFilterDestination("")
        setFilterLocation("")
        setFilterOrigins("")
        setFilterStatus("")
        setQuery({
            warehouse_destination: "",
            warehouse_position: "",
            status: "",
            page: 1,
            limit: 10,
            index: 0,
            sort_by: "updated_at",
            sort_type: "asc",
            asign_lot: "false",
        })
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })
        setRowTotalData({
            page_limit: 0,
            page_total: 0,
            total: 0
        })
    }
    // const selectedItemsID = table.getSelectedRowModel().rows.map(row => row.original.tracking_id);
    const checkedItems = table.getSelectedRowModel().rows.map(row => row.original.tracking_id);
    const [openNewDialog, setOpenNewDialog] = useState(false)

    console.log("Selected : ", selectedItemsID)
    return (
        <>
            <CreateNewLotsDialog
                open={openNewDialog}
                setOpen={setOpenNewDialog}
                reload={reloadData}
            />
            <AssingLotsDialog
                open={openAssignLots}
                setOpen={setOpenAssignLots}
                dataID={selectedItemsID}
                reload={reloadData}
            />
            <div className="text-sm bg-white text-black pb-3">
                <div className="flex flex-row justify-between">
                    <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="pr-8 pl-2 text-xs border border-zinc-300"
                                onChange={handleSearchChange}
                            />
                            <div className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 right-3 text-xs">
                                <SearchIcon width={15} height={15} />
                            </div>
                        </div>
                        {/* <Button
                            variant="filter"
                            size="filter"
                            className="border border-zinc-300 flex items-center rounded h-[35px]"
                        >
                            <FilterIcons className="" fill="#CC0019" />
                        </Button> */}
                        <div className="">
                            <Select onValueChange={handlerFilterOrigin} value={filterOrigins}>
                                <SelectTrigger className="w-[180px] text-xs h-[35px] rounded">
                                    <SelectValue placeholder="Filter By Origin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-[150px]">
                                        <SelectGroup className="text-xs">
                                            <SelectLabel className="text-xs font-bold">Filter Origin</SelectLabel>
                                            <>
                                                {
                                                    warehouseListData.map((item, index) => (
                                                        <SelectItem key={index} className="text-xs" value={item.warehouse_id}>{item.warehouse_name}</SelectItem>
                                                    ))
                                                }
                                            </>
                                        </SelectGroup>
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="">
                            <Select onValueChange={handleFilterDestination} value={filterDestination}>
                                <SelectTrigger className="w-[180px] text-xs h-[35px] rounded">
                                    <SelectValue placeholder="Filter By Destination" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-[150px]">
                                        <SelectGroup className="text-xs">
                                            <SelectLabel className="text-xs font-bold">Filter Destination</SelectLabel>
                                            <>
                                                {
                                                    warehouseListData.map((item, index) => (
                                                        <SelectItem key={index} className="text-xs" value={item.warehouse_id}>{item.warehouse_name}</SelectItem>
                                                    ))
                                                }
                                            </>
                                        </SelectGroup>
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="">
                            <Select onValueChange={handleFilterLocation} value={filterLocation} >
                                <SelectTrigger className="w-[180px] text-xs h-[35px] rounded">
                                    <SelectValue placeholder="Filter By Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-[150px]">
                                        <SelectGroup className="text-xs">
                                            <SelectLabel className="text-xs font-bold">Filter Location</SelectLabel>
                                            {
                                                warehouseListData.map((item, index) => (
                                                    <SelectItem key={index} className="text-xs" value={item.warehouse_id}>{item.warehouse_name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="">
                            <Select onValueChange={handlerStatusChange} value={filterStatus} >
                                <SelectTrigger className="w-[180px] text-xs h-[35px] rounded">
                                    <SelectValue placeholder="Filter Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-[150px]">
                                        <SelectGroup className="text-xs">
                                            <SelectLabel className="text-xs font-bold">Filter Status</SelectLabel>
                                            {
                                                statusListData.map((item, index) => (
                                                    <SelectItem key={index} className="text-xs" value={item.status}>{item.status}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="">
                            {
                                filterDestination !== "" || filterLocation !== "" || filterOrigins !== "" || filterStatus !== "" ? (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    onClick={handleRemoveFilter}
                                                    variant="destructive"
                                                    size="filter"
                                                    className="border flex items-center"
                                                >
                                                    <XIcon className="" fill="#ffff" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remove Filter</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ) : null
                            }
                        </div>
                    </div>
                    {Object.keys(rowSelection).length === 0 ? (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="px-10"
                            onClick={() => setOpenNewDialog(true)}
                        >
                            <p className=" text-xs">New Lots</p>
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="px-10"
                            onClick={() => toggleOpenChange(checkedItems)}
                        >
                            <p className=" text-xs">Assign to Lot</p>
                        </Button>
                    )}
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
                                        style={{ width: `${header.getSize()}px` }}
                                        className={`${isLastHeader
                                            ? "w-[30px] "
                                            : isFirstHeader
                                                ? "w-[50px]"
                                                : ""
                                            } text-xs`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead >
                                );
                            })}
                        </>
                    ))}
                </TableHeader>
                <TableBody>
                    {isSkeleton || !table.getRowModel().rows?.length ? (
                        <>
                            {isSkeleton &&
                                [...Array(table.getRowModel().rows?.length || 5)].map(
                                    (_, index) => (
                                        <TableRow key={index}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                    key={columnIndex}
                                                    className={`${columnIndex === columns.length - 1
                                                        ? "w-[30px]"
                                                        : columnIndex === 0
                                                            ? "w-[50px]"
                                                            : ""
                                                        } text-xs`}
                                                >
                                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                )}

                            {!isSkeleton && !table.getRowModel().rows?.length && (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
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
                                        className={`${cell.isLast
                                            ? "w-[30px]"
                                            : cell.isFirst
                                                ? "w-[50px]"
                                                : ""
                                            } text-xs `}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table >
            <div className="flex justify-between w-full items-center mt-3 pb-2">
                <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">
                    <strong>{table.getFilteredSelectedRowModel().rows.length}</strong>
                    of{" "}
                    <div className="flex flex-row gap-1">
                        <strong>{table.getFilteredRowModel().rows.length}</strong>
                        <p className="text-nowrap"> row(s) selected.</p>
                    </div>
                </div>
                <Pagination className={"flex justify-end w-full items-center gap-2"}>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
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
                    <PaginationContent></PaginationContent>
                </Pagination>
            </div>
        </>
    );
}


