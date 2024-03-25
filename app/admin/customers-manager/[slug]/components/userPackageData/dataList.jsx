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
import { ExternalLink } from 'lucide-react'

export const CustomerPackageTabled = ({ customerID, customerName = "" }) => {
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState([])
  const [openItemsDialog, setOpenItemsDialog] = useState(false)
  const [selectedItemsID, setSelectedItemsID] = useState([])
  const [openInternal, setOpenInternal] = useState(false);
  const [data, setData] = useState({});
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `/api/admin/packages/list`,
          {
            keyword: `${customerName}`,
            date_start: "",
            date_end: "",
            tracking_id: "",
          }
        );
        console.log(response)
        const responseData = response.data.package_info
        const filterDataByCustomerID = responseData.filter((item) => item.customer_id === customerID)
        console.log("🚀 ~ fetchData ~ filterDataByCustomerID:", filterDataByCustomerID)
        setData(filterDataByCustomerID);
        setSkeleton(false)
      } catch (error) {
        setSkeleton(false)
        console.log('Error:', error);
      }
    };
    fetchData();
  }, [customerName, customerID]);

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
      accessorKey: "customer_email",
      header: "Email",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "updated_at",
      header: "Last Update",
    },
    {
      accessorKey: "bin_location",
      header: "Bin Location",
    },
    {
      id: "Action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="w-[80px]" key={row}>
            <div className="flex flex-row gap-2">
              <NextLink href={`/admin/package-details/${row.original.tracking_id}`}>
                <Button
                  variant="ghost"
                  className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                  <p>Details</p>
                  <ExternalLink width={10} height={10} />
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

      <div className="flex justify-end w-full items-end p-3">
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

