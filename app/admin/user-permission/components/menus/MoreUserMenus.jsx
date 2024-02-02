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

export function MoreUserMenus() {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="redOutline"
                    size="sm"
                >
                    <p className='text-xs'>More Action</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-xs" side="bottom" align="left">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-xs text-myBlue">
                        Manage This User Permission
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                        Copy Login URL
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                        Reset User Password
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-red-800">
                        Remove This User
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
