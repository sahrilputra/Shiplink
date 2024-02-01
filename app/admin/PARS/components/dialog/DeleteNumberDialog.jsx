'use client'
import React from 'react'
import { EditSequencesForms } from '../forms/EditSequencesForms'
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
import { useToast } from '@/components/ui/use-toast'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export const DeleteDialog = ({ open, setOpen, onClose }) => {
    const { toast } = useToast()
    return (
        <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold">
                        <div className="">
                            <p>
                                Delete This Number ?
                            </p>
                            <span className="text-red-900"> (This action cannot be undone)</span>
                        </div>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col text-neutral-900">
                            <p>Sequences ID : #1232</p>
                            <p>Type : PARS</p>
                            <p>Number : #1231231</p>

                        </div>
                        <div className="">
                            <Separator className="h-[2px]" />
                        </div>
                        <div className="w-full text-center text-neutral-900"><p>This Number Will No Longer Available Anymore</p></div>
                        <div className="flex flex-col">
                            {/* <DialogClose asChild onClick={onClose()} /> */}
                            <div className=" flex flex-row justify-between gap-2 w-full">

                                <Button
                                    variant="redOutline"
                                    size="sm"
                                    className="w-full"
                                    onClick={onClose}
                                >
                                    <p className=' font-normal text-xs'>Cancel</p>
                                </Button>

                                <Button
                                    variant="destructive"

                                    size="sm"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onClose()
                                        toast({
                                            variant: "destructive",
                                            title: "Number Deleted",
                                            description: "Friday, February 10, 2023 at 5:57 PM",
                                        })
                                    }}
                                >
                                    <p className=' font-normal text-xs'>Delete</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    )
}
