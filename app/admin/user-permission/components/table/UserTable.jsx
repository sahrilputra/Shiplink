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
import { MoreRoleAction } from "../menus/MoreRoleAction";
import NextLink from "next/link"
import { MoreTableAction } from "../menus/MoreTableAction";
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
                                <MoreRoleAction setRoleDialogOpen={setRoleDialogOpen} />
                            </div>
                        </div>
                    </TableHead>
                </TableHeader>
                <TableHeader className="text-sm">
                    <TableHead className="text-xs ">User Name</TableHead>
                    <TableHead className="text-xs  ">User Email</TableHead>
                    <TableHead className="text-xs  ">Password</TableHead>
                    <TableHead className="text-xs  ">Role</TableHead>
                    <TableHead className="text-xs  ">Last Seen</TableHead>
                    <TableHead className="text-xs  ">Create Date</TableHead>
                    <TableHead className="text-xs w-[100px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data.map((item, index) => (
                            <TableRow key={item.id} >
                                <TableCell className="font-medium ">{item.UserName}</TableCell>
                                <TableCell className="font-medium ">{item.Emails}</TableCell>
                                <TableCell className="font-medium ">{item.Password}</TableCell>
                                <TableCell className="font-medium ">{item.Role}</TableCell>
                                <TableCell className="font-medium ">{item.LastSeen}</TableCell>
                                <TableCell className="font-medium ">{item.CreateDate}</TableCell>
                                <TableCell className="w-[30px]  ">
                                    <div className="flex flex-row gap-2">
                                        <NextLink href={`/admin/user-permission/profiles/${item.UserName}`}>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="h-6 px-2"
                                            >
                                                <p className="text-xs">Details</p>
                                            </Button>
                                        </NextLink>
                                        <MoreTableAction />
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
