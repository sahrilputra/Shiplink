'use client'
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateNewBinForms } from '../forms/CreateNewBinForms'

import { Separator } from '@/components/ui/separator'

export const CreateNewBinDialog = ({ open, setOpen }) => {
    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}
            className="w-max"
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Create New Bin</p>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className=" flex justify-center items-center mx-auto">
                    <div className="flex justify-center items-center mx-auto">
                        <CreateNewBinForms close={onClose} />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
