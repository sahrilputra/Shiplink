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

export const DeleteSequences = ({ open, setOpen, onClose }) => {
    const { toast } = useToast()
    return (
        <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold">
                        <div className="">
                            <p>
                                Delete This Sequences Number ?
                            </p>
                            <span className="text-red-900"> (This Action Cannot Be Undone)</span>
                        </div>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col text-neutral-900">
                            <p>Sequences ID : #1232</p>
                            <p>Sequence Type : PARS</p>
                            <p>Sequence Range : 2012 - 2050</p>
                        </div>
                        <div className="">
                            <Separator className="h-[2px]" />
                        </div>
                        <div className="w-full text-center text-neutral-900">
                            <p>All Number On This Sequences Will Be Removed</p>
                        </div>
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
                                            title: "Sequences Deleted",
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
