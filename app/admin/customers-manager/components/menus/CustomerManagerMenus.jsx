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

export const CustomerManagerDropDown = ({ setDeleteOpen, itemID }) => {
    console.log("selected itemID", itemID);
    // State untuk menyimpan itemID yang dipilih
    const [selectedItemID, setSelectedItemID] = useState(null);

    // Ketika komponen di-render, pastikan itemID yang dipilih disetel ke state local
    if (itemID !== selectedItemID) {
        setSelectedItemID(itemID);
    }
    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[20px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem >
                            <p className="text-xs text-myBlue">Copy Customer ID</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <p className="text-xs">Copy Login URL</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">Customer Details</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setDeleteOpen(selectedItemID)} // Gunakan selectedItemID yang disimpan di state local
                        >
                            <p className="text-xs text-red-700">Delete</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
        </>
    );
}
