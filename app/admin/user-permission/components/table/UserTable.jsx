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
import { MoreHorizontalIcon } from "lucide-react";
import { NewRoleDialog } from "../dialog/NewRoleDialog";
import { NewUserDialog } from "../dialog/CreateNewUsersDialog";
export function UserTable({ data, isOpen, setOpen }) {

    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);

    const [expandedRows, setExpandedRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <NewRoleDialog open={roleDialogOpen} setOpen={setRoleDialogOpen} />
            <NewUserDialog open={newUserDialogOpen} setOpen={setNewUserDialogOpen} />
            <Table className="border border-zinc-300 rounded-sm">
                <TableHeader className="text-sm bg-white text-black">
                    <TableHead colSpan={9} className="p-4 " >
                        <div className="flex flex-row justify-between">
                            <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                                <SearchBar />
                                <Button
                                    variant="filter"
                                    size="icon"
                                    className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                    <FilterIcons fill="#CC0019" />
                                </Button>
                                <DatePickerWithRange className={"text-black"} />
                            </div>
                            <div className="inline-flex gap-[10px] justify-evenly items-center">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-[120px]"
                                    onClick={() => setNewUserDialogOpen(true)}
                                >
                                    <p className=" text-xs">Create New User</p>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-[120px]"
                                    onClick={() => setRoleDialogOpen(true)}
                                >
                                    <p className=" text-xs">Manage Role</p>
                                </Button>
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
                <TableHeader className="text-sm">
                    <TableHead className=" text-center">User Name</TableHead>
                    <TableHead className=" ">User Email</TableHead>
                    <TableHead className=" ">Password</TableHead>
                    <TableHead className=" ">Role</TableHead>
                    <TableHead className=" ">Last Seen</TableHead>
                    <TableHead className=" ">Create Date</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <TableRow key={item.id} >
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.UserName}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Emails}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Password}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.Role}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.LastSeen}</TableCell>
                                <TableCell className="font-medium p-1 px-[20px] py-[10px]">{item.CreateDate}</TableCell>
                                <TableCell className="w-[30px]  p-1 px-[20px] py-[10px]">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-6 px-2"
                                        >
                                            <p className="text-xs">Details</p>
                                        </Button>
                                        <Button
                                            variant="tableBlue"
                                            size="icon"
                                            className={` rounded-sm w-6 h-6`}
                                        >
                                            <MoreHorizontalIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>
        </>
    )
}
