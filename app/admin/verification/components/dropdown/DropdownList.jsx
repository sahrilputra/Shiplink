'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { DeleteDialog } from "../../../components/dialog/DeleteNumberDialog"
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

export const DropdownList = () => {
    return (
        <>
            <Dialog>
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


                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem>
                            <p className="text-xs text-myBlue">View Sequence Details</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">Edit Selected Number</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            triggerChildren="Delete"
                        >
                            <p className="text-xs">Show Item Details</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">Print Number</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <p className="text-xs text-red-800">Delete Number</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
        </>
    )
}
