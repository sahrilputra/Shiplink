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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function PermissionTableComponents({ data, isOpen, setOpen }) {

    return (
        <>
            <Table className="border border-zinc-300 rounded-sm">
                <TableHeader className="text-sm">
                    <TableHead className=" text-left">Manage Permission</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    <TableRow  >
                        <TableCell className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold">Create New User</p>
                                <p className="text-xs font-regular text-zinc-500">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</p>
                            </div>
                        </TableCell>
                        <TableCell className="w-[80px]">
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow  >
                        <TableCell className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold">Create New User</p>
                                <p className="text-xs font-regular text-zinc-500">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</p>
                            </div>
                        </TableCell>
                        <TableCell className="w-[80px]">
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow  >
                        <TableCell className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold">Create New User</p>
                                <p className="text-xs font-regular text-zinc-500">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</p>
                            </div>
                        </TableCell>
                        <TableCell className="w-[80px]">
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow  >
                        <TableCell className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold">Create New User</p>
                                <p className="text-xs font-regular text-zinc-500">Receive a timely reminder one day before your parcel is scheduled for pickup, ensuring youre prepared.</p>
                            </div>
                        </TableCell>
                        <TableCell className="w-[80px]">
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow  >
                        <TableCell colSpan={2} className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-row gap-3 justify-end items-end">
                                <Button
                                    variant="redOutline"
                                    size="sm"
                                    className="w-[80px]"
                                >
                                    <p>Cancel</p>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-[80px]"
                                >
                                    <p>Save</p>
                                </Button>
                            </div>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
