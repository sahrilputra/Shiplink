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
import NextLink from "next/link"
import { MoreHorizontalIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function MoreUserMenus({ params, setOpenDelete, setOpenPassword, copyLogin }) {

    const { toast } = useToast()
    const handleCopyLogin = () => {
        copyLogin()
        toast({
            title: 'Login URL Copied!',
            description: 'Login URL has been copied to clipboard.',
            status: 'success',
        });
    }
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
                        <NextLink href={`${params}/permission`}>
                            Manage This User Permission
                        </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleCopyLogin}
                        className="text-xs"
                    >
                        Copy Login URL
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenPassword(true)}
                        className="text-xs"
                    >
                        Set New Password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenDelete(true)}
                        className="text-xs text-red-800"
                    >
                        Remove This User
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
