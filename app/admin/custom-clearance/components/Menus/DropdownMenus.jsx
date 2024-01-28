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
                    size="tableIcon"
                    className={`rounded-sm w-max px-[5px] h-[25px]`}
                    onClick={() => toggleOpenChange()}
                >
                    <MoreHorizontalIcon width={15} height={15} />
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
