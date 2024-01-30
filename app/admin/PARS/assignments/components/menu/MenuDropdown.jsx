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

import React from 'react'

export const MenuDropdown = ({ getSelectedItem }) => {
    const handleItemClick = (item) => {
        getSelectedItem(item)
    };

    return (
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
                <DropdownMenuItem onClick={() => handleItemClick("SequenceDetails")}>
                    <p className="text-xs text-myBlue">View Sequence Details</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick("Show Item Details")}>
                    <p className="text-xs">Show Item Details</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick("Print Number")}>
                    <p className="text-xs">Print Number</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick("Delete Number")}>
                    <p className="text-xs">Delete Number</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
