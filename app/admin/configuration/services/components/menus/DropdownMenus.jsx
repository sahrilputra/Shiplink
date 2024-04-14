import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import React from 'react'
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast'
import NextLink from 'next/link'
export const DropdownMenus = ({ id, reload, serviceID }) => {

    const { toast } = useToast();
    const handleDelete = async () => {
        try {
            const response = await axios.post(
                `/api/admin/config/services/remove`,
                {
                    id: `${id.toString()}`
                }
            )
            console.log("🚀 ~ handleDelete ~ response:", response)
            if (response.data.message !== "success") {
                toast({
                    title: `Error!`,
                    description: response.data.message,
                });
            } else {
                toast({
                    title: `Removing Status!`,
                    description: response.data.message,
                    status: 'success',
                });
            }
            reload();
        } catch (error) {
            console.log(error)
            toast({
                type: "error",
                description: error,
            })
        }
    }
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="tableBlue"
                    size="tableIcon"
                    className={`rounded-sm w-max px-[5px] h-[20px]`}
                >
                    <MoreHorizontalIcon width={15} height={15} />
                </Button>
            </DropdownMenuTrigger >
            <DropdownMenuContent side={"left"} sideOffset={2}>
                <NextLink passHref href={`/admin/product-manager/services?service_id=${serviceID}`}>
                    <DropdownMenuItem >
                        <p className="text-xs">Edit</p>
                    </DropdownMenuItem>
                </NextLink>
                <DropdownMenuItem
                    onClick={handleDelete}
                >
                    <p className="text-xs text-red-700">Delete</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
