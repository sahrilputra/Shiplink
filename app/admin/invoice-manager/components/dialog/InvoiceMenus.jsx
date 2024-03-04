'use client'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

export const InvoiceMenus = ({ handler, invID, handlerDelete }) => {
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    return (
        <>
            <Dialog>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={` w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem>
                            <p className="text-xs text-myBlue">Download Invoice</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => { handler(invID) }}
                        >
                            <p className="text-xs">Update Status</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => { handlerDelete(invID) }}
                        >
                            <p className="text-xs text-red-800">Delete</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
        </>
    )
}
