import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowDownV2Icons, FilterIcons, SearchIcon } from "@/components/icons/iconCollection";
import { AArrowUp, AArrowDown } from "lucide-react";

export const SortMenus = ({ handleSortChange, sortAsc }) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="filter"
                    size="filter"
                    className='border border-zinc-300 flex items-center rounded'>
                    <FilterIcons
                        className=""
                        fill="#CC0019" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border" >
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-myBlue px-1 py-1">Sort By</DropdownMenuLabel>
                    <DropdownMenuItem className={`text-xs flex flex-row justify-between ${sortAsc === "tracking_id" && `bg-blue-100`} `}
                        onSelect={() => {
                            handleSortChange("tracking_id")
                        }}>
                        Tracking ID
                        {
                            sortAsc === "tracking_id" ? <AArrowDown className="w-4 h-4 text-myBlue" /> : ""
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`text-xs flex flex-row justify-between ${sortAsc === "customer_name" && `bg-blue-100`} `}
                        onSelect={() => {
                            handleSortChange("customer_name")
                        }}>
                        Name
                        {
                            sortAsc === "customer_name" ? <AArrowDown className="w-4 h-4 text-myBlue" /> : ""
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`text-xs flex flex-row justify-between ${sortAsc === "warehouse_destination" && `bg-blue-100`} `}
                        onSelect={() => {
                            handleSortChange("warehouse_destination")
                        }}>
                        Destination
                        {
                            sortAsc === "warehouse_destination" ? <AArrowDown className="w-4 h-4 text-myBlue" /> : ""
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`text-xs flex flex-row justify-between ${sortAsc === "updated_at" && `bg-blue-100`} `}
                        onSelect={() => {
                            handleSortChange("updated_at")
                        }}>
                        Date
                        {
                            sortAsc === "updated_at" ? <AArrowDown className="w-4 h-4 text-myBlue" /> : ""
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`text-xs flex flex-row justify-between ${sortAsc === "status_id" && `bg-blue-100`} `}
                        onSelect={() => {
                            handleSortChange("status_id")
                        }}>
                        Status
                        {
                            sortAsc === "status_id" ? <AArrowDown className="w-4 h-4 text-myBlue" /> : ""
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs flex flex-row justify-between text-red-700"
                        onSelect={() => {
                            handleSortChange("")
                        }}>
                        Remove Sort
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
