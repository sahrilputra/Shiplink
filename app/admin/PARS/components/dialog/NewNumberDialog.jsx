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
export const NewNumberDialog = ({ open, setOpen }) => {
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>New Created</p>
                    </DialogTitle>
                    <DialogClose /> {/* Letakkan DialogClose di sini */}
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-3">
                        <div className="">
                            <Separator className="h-[2px]" />
                        </div>
                        <div className="flex flex-col text-center font-medium text-black">
                            <p>Id : #1232</p>
                            <p>Sequence Type : PARS</p>
                            <p>Range : 2012 - 2050</p>
                            <p>Sequences Start : 20001</p>
                            <p>Sequences End : 20020</p>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
