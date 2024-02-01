'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { EditLotsDialog } from '../AssignLotsDialog/EditLotsDialog'
import { Dialog } from '@/components/ui/dialog'
export const LotsMoreMenusDropDrown = ({ getSelectedItem, dataIDhandler, data }) => {
    const handleItemClick = (item) => {
        getSelectedItem(item)
        dataIDhandler(data)
    };

    const [editModalOpen, setEditModalOpen] = useState(false);

    const render = () => {
        if (editModalOpen) {
            return <EditLotsDialog open={editModalOpen} setOpen={setEditModalOpen} data={data} />
        }
    }
    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem >
                            <p className="text-xs text-myBlue">Download Package List</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">View Lots Details</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            triggerChildren="Delete"
                            onClick={() => setEditModalOpen(true)}
                        >
                            <p className="text-xs">Edit Lots</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">Download Documents</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {render()}
            </Dialog>
        </>
    );
}
