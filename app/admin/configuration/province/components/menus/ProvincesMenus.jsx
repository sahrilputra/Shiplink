import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import NextLink from "next/link"

export const ProvinceMenus = ({ province }) => {


    // const fetchData = async () => {
    //     try {
    //         const response = await axios.post(
    //             `/api/admin/config/province/delete`,
    //             province_id
    //         );
    //         console.log(response.data)
    //         const data = await response.data;
    //         setProvince(data.province);
    //     } catch (error) {
    //         console.log('Error:', error);
    //     }
    // };


    console.log("Clicked Province", province)

    return (
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
            <DropdownMenuContent className="text-xs" side="left" align="left">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-xs text-myBlue">
                        See this Country In Country Tab
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-xs text-red-700">
                        Delete This Province
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
