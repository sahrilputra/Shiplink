/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import NextLink from 'next/link'
import { Card } from '@/components/ui/card'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsLeftIcon, ChevronsRightIcon, ExternalLink } from 'lucide-react'
import { VerifiedStatus } from '@/app/admin/verification/components/status/VerifiedStatus'

export const CustomerPackageTabled = ({ customerID, customerName = "" }) => {
  console.log("🚀 ~ CustomerPackageTabled ~ customerID:", customerID)
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState([])
  const [isSortedDesc, setIsSortedDesc] = useState(false);

  const [openItemsDialog, setOpenItemsDialog] = useState(false)
  const [selectedItemsID, setSelectedItemsID] = useState([])
  const [openInternal, setOpenInternal] = useState(false);
  const [data, setData] = useState({});
  const [skeleton, setSkeleton] = useState(true);
  const [query, setQuery] = useState({
    keyword: "",
    date_start: "",
    customer_id: `${customerID}`,
    date_end: "",
    tracking_id: "",
    status: "",
    page: 1,
    limit: 10,
    index: 0,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 0,
  });

  const [rowTotalData, setRowTotalData] = useState({
    page_limit: 0,
    page_total: 0,
    total: 0
  })

  console.log("🚀 ~ CustomerPackageTabled ~ rowTotalData:", rowTotalData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `/api/admin/packages/list`,
          {
            ...query,
            customer_id: `${customerID}`,
          }
        );
        const data = await response.data;
        console.log("DATA : ", data)
        const responseData = response.data.package_info
        setData(responseData);
        setRowTotalData({
          page_limit: data.page_limit,
          page_total: data.page_total,
          total: data.total
        });
        setPagination(prevPagination => ({
          ...prevPagination,
          pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
        }));

        setSkeleton(false)
      } catch (error) {
        setSkeleton(false)
        console.log('Error:', error);
      }
    };
    fetchData();
  }, [customerName, customerID, query]);

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

  const columns = [

    {
      accessorKey: "tracking_id",
      header: "Tracking ID",
      className: "text-xs",
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => {
        return (
          <>
            <>
              {
                row.original.status === "Hold For Pickup" ? (
                  <div className="text-xs">
                    {`HFP - ${row.original.warehouse_name_destination}`}
                  </div>
                ) : row.original.warehouse_name_destination === null && row.original.warehouse_name_destination === null ? (
                  <div className="text-xs">
                    -
                  </div>
                ) : (
                  <>
                    <div className="text-xs">
                      {`${row.original.warehouse_name_destination !== null ? row.original.warehouse_name_destination : "-"} Warehouse - ${row.original.country_code_destination}`}
                    </div>
                  </>
                )
              }
            </>
          </>
        )
      }
    },
    {
      accessorKey: "updated_at",
      header: "Last Update",
    },
    {
      accessorKey: "bin_location",
      header: "Bin Location",
      cell: ({ row }) => {
        return (
          <div className="text-xs">
            {row.original.bin_location !== "Undefined" ? row.original.bin_location : "-"}
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      size: 90,
      header: ({ getSorting }) => {
        return (
          <div
            className="cursor-pointer select-none text-center flex flex-row "
            onClick={() => {
              setSorting([{ id: "status", desc: !isSortedDesc }]);
              setIsSortedDesc(!isSortedDesc);
            }}
          >
            <div className="flex flex-row items-center mx-auto gap-3">
              Status
              <>
                {isSortedDesc ? <ChevronDown className="text-white" width={15} /> : <ChevronUp className="text-white" width={15} />}
              </>
            </div>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center text-xs w-[90px] flex items-center  mx-auto" >
            <VerifiedStatus param={row.original.status} />
          </div>
        )
      },

    },
    {
      id: "Action",
      header: ({ row }) => {
        return (
          <div className="w-full text-xs text-center">
            Action
          </div>
        )
      },
      size: 50,
      cell: ({ row }) => {
        return (
          <div className="w-[50px] mx-auto" key={row}>
            <div className="flex flex-row gap-2">
              <NextLink href={`/admin/package-details/${row.original.tracking_id}`}>
                <Button
                  variant="tableBlue"
                  size="tableIcon"
                  className={`w-max px-[10px] h-[20px] gap-1`}
                >
                  <p className="text-[11px] text-myBlue">Details</p>
                </Button>
              </NextLink>
            </div>
          </div>
        )
      },
    },
  ]


  const table = useReactTable({
    data: data,
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
      pagination,
    },

  });

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
                    style={{ width: `${header.getSize()}px` }}
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

          {skeleton || !table.getRowModel().rows?.length ? (
            <>
              {skeleton &&
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

              {!skeleton && !table.getRowModel().rows?.length && (
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

      <div className="flex justify-between w-full items-center mt-4 pb-2">
        <div className="flex items-start gap-1 text-xs text-zinc-500 flex-row px-3">

        </div>
        <Pagination className={'flex justify-end w-full items-center gap-2 '}>
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
            onClick={() => handlerPaginationChange(table.getPageCount() - 1)}
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

