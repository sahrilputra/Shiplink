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

export const EditSelectedNumber = ({ open, setOpen, data, reload }) => {

    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Edit Selected Sequence</p>
                    </DialogTitle>
                    <DialogClose /> {/* Letakkan DialogClose di sini */}
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <p>Type : {data?.type}</p>
                            <p>Sequences ID : #{data?.id}</p>
                            <p>Sequences Range : {data?.sequence_range}</p>
                        </div>
                        <div className="">
                            <Separator className="h-[2px]" />
                        </div>

                        <div className="flex flex-col">
                            <EditSelectedNumberForms close={onClose} data={data} reload={reload} />
                        </div>
                        <DialogClose close={onClose} />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
