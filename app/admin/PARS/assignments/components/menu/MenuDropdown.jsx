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
import { DeleteDialog } from "../../../components/dialog/DeleteNumberDialog"
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { SequencesDetails } from '../../../components/dialog/SequencesDetails'
import { EditSelectedNumber } from '../../../components/dialog/EditSelectedNumber'
import NextLink from "next/link"
export const MenuDropdown = ({ getSelectedItem, dataIDhandler, dataId }) => {
    const handleItemClick = (item) => {
        getSelectedItem(item)
        dataIDhandler(dataId)
    };

    const [isSequenceDetailsOpen, setSequenceDetailsOpen] = useState(false)
    const [isEditSelectedNumberOpen, setEditSelectedNumberOpen] = useState(false)
    const [isDeleteOpen, setDeleteOpen] = useState(false);

    const handleSelectedNumberClose = () => {
        setEditSelectedNumberOpen(false)
    }
    const handleCloseDeleteClose = () => {
        setDeleteOpen(false)
    }

    const render = () => {
        if (isSequenceDetailsOpen) {
            return <SequencesDetails open={isSequenceDetailsOpen} onOpen={setSequenceDetailsOpen} data={dataId} />
        }
        if (isEditSelectedNumberOpen) {
            return <EditSelectedNumber open={isEditSelectedNumberOpen} setOpen={setEditSelectedNumberOpen} onClose={handleSelectedNumberClose} data={dataId} />
        }
        if (isDeleteOpen) {
            return <DeleteDialog open={isDeleteOpen} setOpen={setDeleteOpen} onClose={handleCloseDeleteClose} data={dataId} />
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
                        <DropdownMenuItem onClick={() => setSequenceDetailsOpen(true)}>
                            <p className="text-xs text-myBlue">View Sequence Details</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditSelectedNumberOpen(true)}>
                            <p className="text-xs">Edit Selected Number</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NextLink href={'/admin/package-details/2'}>
                                <p className="text-xs">Show Item Details</p>
                            </NextLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p className="text-xs">Print Number</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                            <p className="text-xs text-red-800">Delete Number</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {render()}
            </Dialog>
        </>
    );
}
