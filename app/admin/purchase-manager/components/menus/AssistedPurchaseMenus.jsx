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
import { Dialog, DialogContent, } from "@/components/ui/dialog"
export const AssistedPurchaseMenus = ({ getSelectedItem, dataIDhandler, dataId }) => {

    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem >
                            <p className="text-xs text-myBlue">Copy User ID</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <p className="text-xs">Show Invoice</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            triggerChildren="Delete"
                        >
                            <p className="text-xs">Cancel : Out Of Stock</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">Cancel : Price Mismatch</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <p className="text-xs">Cancel : Untrusted Website</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </Dialog>
        </>
    );
}
