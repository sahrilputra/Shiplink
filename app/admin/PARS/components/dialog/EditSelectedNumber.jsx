'use client'
import React from 'react'
import { EditSequencesForms } from '../forms/EditSequencesForms'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { Separator } from '@/components/ui/separator'
import { EditSelectedNumberForms } from '../forms/EditSelectedForms'

export const EditSelectedNumber = ({ open, setOpen, onClose, data }) => {
   
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Edit Selected Sequence</p>
                    </DialogTitle>
                    <DialogClose /> {/* Letakkan DialogClose di sini */}
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <p>Sequences ID : #1232</p>
                            <p>Type : PARS</p>
                            <p>Item ID : #1231231</p>
                        </div>
                        <div className="">
                            <Separator className="h-[2px]" />
                        </div>

                        <div className="flex flex-col">
                            <EditSelectedNumberForms close={onClose} />
                        </div>
                        <DialogClose  close={onClose} />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
