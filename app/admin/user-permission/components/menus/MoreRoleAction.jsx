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

export function MoreRoleAction({ setRoleDialogOpen }) {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                    className="w-[120px]"
                >
                    <p className=" text-xs">Manage Role</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-xs" side="bottom" align="left">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-xs text-myBlue">
                        <NextLink href={"/admin/user-permission/permission"}>
                            Manage Role
                        </NextLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setRoleDialogOpen(true)}
                        className="text-xs">
                        Create New Role
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
