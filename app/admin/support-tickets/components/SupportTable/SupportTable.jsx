'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableCaption, TableFooter, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { FilterIcons } from '@/components/icons/iconCollection'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import { Checkbox } from '@/components/ui/checkbox'
import CreateNewTickets from '../dialog/NewTickets'
import { UpdateStatusDialog } from '../dialog/UpdateStatus'
import { addDays, format } from "date-fns";
export const SupportTable = ({ data, onRowClick, onHide, open, setOpen }) => {

    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    
    const handleSetDate = (newDate) => {
        setDate({
            from: formatDate(newDate?.from || new Date()),
            to: formatDate(newDate?.to || new Date()),
        });

    };
    const toggleOpenDialog = () => {
        setOpen(!open)
    }

    const handleRowClick = (ticket) => {
        setSelectedRow(ticket.TicketsID);
        onRowClick(ticket);
    }

    return (
        <>
            <UpdateStatusDialog open={openUpdate} setOpen={setOpenUpdate} />
            <div className="w-full p-2">

                <div className="text-sm bg-white text-black">
                    <div colSpan={7} className="p-2 " >
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
                                <DatePickerWithRange className={"text-black"} mySetdate={handleSetDate}/>
                            </div>
                            <div className="">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="px-4"
                                    onClick={() => toggleOpenDialog()}
                                >
                                    <p className=" text-xs">Create New Tickets</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Table className="p-3">
                    {onHide
                        ? (
                            <>
                                <TableHeader className="text-xs">
                                    <TableHead className="text-xs w-[50px] rounded-tl-md ">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="text-xs w-[150px] ">Open Date</TableHead>
                                    <TableHead className="text-xs ">Subject</TableHead>
                                    <TableHead className="text-xs  text-center ">Status</TableHead>
                                    <TableHead className="text-xs  rounded-tr-md "></TableHead>
                                </TableHeader>
                            </>
                        ) : (
                            <>
                                <TableHeader>
                                    <TableHead className="text-xs w-[50px] rounded-tl-md ">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="text-xs w-[100px] ">Ticket ID</TableHead>
                                    <TableHead className="text-xs w-[200px]">Open Date</TableHead>
                                    <TableHead className="text-xs ">Subject</TableHead>
                                    <TableHead className="text-xs  ">Customer</TableHead>
                                    <TableHead className="text-xs">Reply By</TableHead>
                                    <TableHead className="text-xs  text-center">Status</TableHead>
                                    <TableHead className="text-xs  rounded-tr-md "></TableHead>
                                </TableHeader>
                            </>
                        )}

                    <TableBody>
                        {data.map((ticket) => (
                            <>
                                {onHide ? (
                                    <>
                                        <TableRow
                                            className={`cursor-pointer text-sm ${selectedRow === ticket.TicketsID ? 'bg-blue-100' : ''}`}
                                            key={ticket.TicketsID}
                                            onClick={() => handleRowClick(ticket)}>
                                            <TableCell className="font-medium text-xs "><Checkbox /></TableCell>
                                            <TableCell className="font-medium text-xs ">{ticket.OpenDate}</TableCell>
                                            <TableCell className="text-xs ">{ticket.Description}</TableCell>
                                            <TableCell className="text-center text-xs ">{ticket.Status}</TableCell>
                                            <TableCell className="text-center text-xs ">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-6 px-2"
                                                    onClick={() => setOpenUpdate(true)}
                                                >
                                                    <p className="text-xs text-[10px]">Update</p>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </>

                                ) : (
                                    <>
                                        <TableRow
                                            className={`cursor-pointer text-sm ${selectedRow === ticket.TicketsID ? 'bg-blue-100' : ''}`}
                                            key={ticket.TicketsID}
                                            onClick={() => handleRowClick(ticket)}>
                                            <TableCell className="font-medium text-xs "><Checkbox /></TableCell>
                                            <TableCell className="font-medium text-xs ">#{ticket.TicketsID}</TableCell>
                                            <TableCell className="font-medium text-xs  ">{ticket.OpenDate}</TableCell>
                                            <TableCell className="text-xs ">{ticket.Description}</TableCell>
                                            <TableCell className="text-xs ">{ticket.Customer.Name}</TableCell>
                                            <TableCell className=" text-xs ">{ticket.ReplyBy}</TableCell>
                                            <TableCell className="text-center text-xs ">{ticket.Status}</TableCell>
                                            <TableCell className="text-center text-xs ">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-6 px-2"
                                                    onClick={() => setOpenUpdate(true)}
                                                >
                                                    <p className="text-xs text-[10px]">Update</p>
                                                </Button>
                                                {/* <Button
                                                    variant="secondary"
                                                    size="xs"
                                                    className="px-2 py-1"
                                                    onClick={() => setOpenUpdate(true)}
                                                >
                                                    <p className='text-[10px] text-white '>Update</p>
                                                </Button> */}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
