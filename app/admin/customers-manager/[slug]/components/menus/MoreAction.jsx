import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'


export const MoreAction = () => {
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
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <p className='text-blue-900 text-xs'>Showing All Package</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-xs'>Send Invoice</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-xs'>Reference Friends</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-xs'>Transaction History</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-xs'>Reset User Password</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-red-600 text-xs'>Delete This User</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
