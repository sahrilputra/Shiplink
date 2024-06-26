import React, { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Loaders } from '@/components/ui/loaders'

import { useToast } from '@/components/ui/use-toast'
export const RemovePackageDialog = ({ open, setOpen, deleteId, lotsId, reload }) => {
    console.log("🚀 ~ RemovePackageDialog ~ deleteId:", deleteId)
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const onClose = () => {
        setOpen(false)
    }
    const fetchData = async (deleteIDs) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/remove_package`,
                {
                    tracking_id: deleteIDs,
                    lots_id: lotsId
                }
            );
            toast({
                title: `Package Removed!`,
                description: response.data.message,
                status: 'success',
            });
            setLoading(false);
            reload();
            onClose();
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Error!',
                description: 'An error occurred while removing package.',
                status: 'error',
            });
            console.log('Error:', error);
        }
    };
    const handleSubmit = () => {
        fetchData(deleteId);
    };
    return (
        <>
            {
                loading && <Loaders />
            }
            <AlertDialog open={open} onOpenChange={setOpen} >
                <AlertDialogContent className='w-[500px]' >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold">
                            <div className="">
                                <p>
                                    Remove {deleteId?.length} From this Lots  ?
                                </p>
                                <span className="text-red-900"> (This Action Cannot Be Undone)</span>
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        <div className="flex flex-col gap-3">
                            <div className="w-full text-neutral-900">
                                <p>All the package will be romove</p>
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
