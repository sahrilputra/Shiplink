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
export function CustomBrokerDropdownMenus() {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="tableBlue"
                    size="icon"
                    className={` rounded-sm w-6 h-6`}
                    onClick={() => toggleOpenChange()}
                >
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-xs" side="left" align="left">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-xs text-myBlue">
                        Download All Invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                        Package Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                        Status : Pending Border Clearance
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                        Status : Border Inspection
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                        Status : Arrived At Destination
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
