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
import { Separator } from '@/components/ui/separator'
import { SequencesDetailsCard } from '../others/SequencesDetailsCard'

export const SequencesDetails = ({ open, onOpen, data }) => {

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        Showing Sequence Details
                    </DialogTitle>
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

                        <div className="flex flex-col gap-2 items-center w-full">
                            <SequencesDetailsCard />
                            <SequencesDetailsCard />
                            <SequencesDetailsCard />
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
