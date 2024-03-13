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
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'

export const MoreAction = ({ setOpenPassword, setOpenDelete, customerID }) => {
    console.log("🚀 ~ MoreAction ~ customerID:", customerID)
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="redOutline"
                    size="xs"
                >
                    <p className='text-xs'>More Action</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <p className='text-blue-900 text-xs'>Showing All Package</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <NextLink href={`/admin/invoice-manager/invoice?customer=${customerID}`} passHref>
                        <p className='text-xs'>Send Invoice</p>
                    </NextLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-xs'>Reference Friends</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <p className='text-xs'>Transaction History</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpenPassword(true)}
                >
                    <p className='text-xs'>Change Password</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpenDelete(true)}
                >
                    <p className='text-red-600 text-xs'>Delete This User</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
