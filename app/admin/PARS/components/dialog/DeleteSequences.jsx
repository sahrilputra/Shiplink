'use client'
import React, { useState } from 'react'
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
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'

export const DeleteSequences = ({ open, setOpen, deleteID, reloadData }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    console.log("Delete ID", deleteID)

    const onClose = () => {
        setOpen(false)
    }
    const fetchData = async (deleteIDs) => {
        setLoading(true);
        try {
            for (const deleteID of deleteIDs) {
                const response = await axios.post(
                    `/api/admin/Pars/delete`,
                    { data: deleteID }
                );
                toast({
                    title: `Sequences ${deleteID} has beed Deleted!`,
                    description: response.data.message,
                    status: 'success',
                });
            }
            setLoading(false);
            reloadData();
            onClose();
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Error Deleting Sequences!',
                description: 'An error occurred while deleting Sequences.',
                status: 'error',
            });
            console.log('Error:', error);
        }
    };
    const handleSubmit = () => {
        fetchData(deleteID);
    };

    return (
        <>
            {loading && <Loaders />}
            <AlertDialog open={open} onOpenChange={setOpen} >
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold">
                            <div className="">
                                <p>
                                    Delete {deleteID?.length} Sequences Number ?
                                </p>
                                <span className="text-red-900"> (This Action Cannot Be Undone)</span>
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        <div className="flex flex-col gap-3">
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
                                        onClick={handleSubmit}
                                    >
                                        <p className=' font-normal text-xs'>Delete</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
