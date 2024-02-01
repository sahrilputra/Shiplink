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
import { PackageDialogDetails } from '../dialog/PackageDialogDetails'
export const DropdownPendingList = () => {

    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const render = () => {
        if (isDetailsOpen) {
            return <PackageDialogDetails open={isDetailsOpen} setOpen={setDetailsOpen} />
        }
    }

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
                            <p className="text-xs text-myBlue">Download All Invoice</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setDetailsOpen(true)}
                        >
                            <p className="text-xs">Show Package Details</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {render()}
            </Dialog>
        </>
    )
}
