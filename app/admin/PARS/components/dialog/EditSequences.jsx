'use client'
import React from 'react'
import { EditSequencesForms } from '../forms/EditSequencesForms'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from '@/components/ui/separator'

export const EditSequences = ({ open, setOpen }) => {
    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Edit Selected Sequence</p>
                    </DialogTitle>
                    <DialogClose /> {/* Letakkan DialogClose di sini */}
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <p>Id : #1232</p>
                            <p>Sequence Type : PARS</p>
                            <p>Range : 2012 - 2050</p>
                        </div>
                        <div className="">
                            <Separator className="h-[2px]" />
                        </div>

                        <div className="flex flex-col">
                            <EditSequencesForms close={onClose} />
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
