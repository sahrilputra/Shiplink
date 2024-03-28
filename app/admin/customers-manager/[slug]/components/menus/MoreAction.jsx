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

export const MoreAction = ({ setOpenPassword, setOpenDelete, customerID, setOpenSuspend, setOpenActivate }) => {
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
                <NextLink href={`/admin/package-details/customer/${customerID}`} passHref>
                    <DropdownMenuItem>
                        <p className='text-blue-900 text-xs'>Show All Packages</p>
                    </DropdownMenuItem>
                </NextLink>
                <NextLink href={`/admin/invoice-manager/invoice?customer=${customerID}`} passHref>
                    <DropdownMenuItem>
                        <p className='text-xs'>Create Invoice</p>
                    </DropdownMenuItem>
                </NextLink>
                <NextLink href={`/admin/customers-manager/invoice/${customerID}`} passHref>
                    <DropdownMenuItem>
                        <p className='text-xs'>View Invoices</p>
                    </DropdownMenuItem>
                </NextLink>
                <DropdownMenuItem
                    onClick={() => setOpenPassword(true)}
                >
                    <p className='text-xs'>Set Password</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpenSuspend(true)}
                >
                    <p className='text-xs'>Suspend this Customer</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpenActivate(true)}
                >
                    <p className='text-xs'>Activate this Customer</p>
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
