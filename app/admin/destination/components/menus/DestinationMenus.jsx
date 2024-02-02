'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { Dialog } from '@/components/ui/dialog'
import { AssignLotsToBin } from '../Dialog/AssignLotsToBin'
import { UpdateStatusDialog } from '../Dialog/UpdateStatusDialog'
import NextLink from "next/link"
export const DestinationMenus = ({ getSelectedItem, dataIDhandler, data, dataID }) => {

    const [assignOpen, setAssignOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)

    const render = () => {
        if (assignOpen) {
            return <AssignLotsToBin open={assignOpen} setOpen={setAssignOpen} />
        }
        if (statusOpen) {
            return <UpdateStatusDialog open={statusOpen} setOpen={setStatusOpen} />
        }
    }
    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem
                            onClick={() => setAssignOpen(true)}
                        >
                            <p className="text-xs text-myBlue">Assign This Lots</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setStatusOpen(true)}
                        >
                            <p className="text-xs">Update Lots Status</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NextLink href={`/admin/destination/lots//${dataID}`}>
                                <p className="text-xs">Load Lots Details</p>
                            </NextLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {
                    render()
                }
            </Dialog>
        </>
    );
}
