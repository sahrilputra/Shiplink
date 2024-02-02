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
import React from 'react'

export function MoreTableAction({ setRoleDialogOpen }) {
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
                        <NextLink href={"/admin/user-permission/permission"}>
                            Manage User Permission
                        </NextLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-xs">
                        User Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-xs">
                        Change Role
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-xs text-red-700">
                        Delete User
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
