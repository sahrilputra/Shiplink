import React from 'react'
import { NewLotsFrom } from './NewLotForms'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export const EditLotsDialog = ({ open, setOpen, data, reload }) => {
    console.log("Lots Data : ", data)
    const close = () => {
        setOpen(false)
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[450px] gap-0" close={false}>
                <AlertDialogHeader>s
                    <AlertDialogTitle>
                        <div className="flex flex-col gap-2 font-bold">
                            <p>Edit Lot</p>
                        </div>

                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className="py-4">
                    <div className="flex flex-col gap-2 ">
                        <div className="w-full">
                            <Separator className="w-full h-[1px]" />
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                            <NewLotsFrom data={data} close={close} reload={reload} />
                        </div>
                    </div>
                </div>

            </AlertDialogContent>
        </AlertDialog >
    )
}
