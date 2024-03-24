'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from 'lucide-react'
import NextLink from 'next/link'
export const PackageMenus = ({ open, setOpen, itemID, handlerDelete }) => {
    console.log("selected itemID", itemID);
    // State untuk menyimpan itemID yang dipilih
    const [selectedItemID, setSelectedItemID] = useState(null);

    // Ketika komponen di-render, pastikan itemID yang dipilih disetel ke state local
    if (itemID !== selectedItemID) {
        setSelectedItemID(itemID);
    }

    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="tableBlue"
                        size="tableIcon"
                        className={`rounded-sm w-max px-[5px] h-[20px]`}
                    >
                        <MoreHorizontalIcon width={15} height={15} />
                    </Button>
                </DropdownMenuTrigger >
                <DropdownMenuContent side={"left"} sideOffset={2}>
                    <DropdownMenuItem >
                        <p className="text-xs text-myBlue">Copy Package ID</p>
                    </DropdownMenuItem>
                    <NextLink href={`/admin/package-details/${itemID}`}>
                        <DropdownMenuItem>
                            <p className="text-xs">Package Details</p>
                        </DropdownMenuItem>
                    </NextLink>
                    <DropdownMenuItem
                        onClick={() => handlerDelete(itemID)} // Gunakan selectedItemID yang disimpan di state local
                    >
                        <p className="text-xs text-red-700">Delete</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
