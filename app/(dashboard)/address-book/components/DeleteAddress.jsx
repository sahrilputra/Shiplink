
import React, { useState } from 'react'
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
import { Button } from "@/components/ui/button"
import axios from "axios";
import { Loaders } from '@/components/ui/loaders';

export const DeleteAddress = ({ open, setOpen, deleteID, reloadData }) => {
    const { toast } = useToast()
    const onClose = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)
    console.log("Delete ID", deleteID)
    const dataLength = deleteID.length;

    const fetchData = async (deleteIDs) => {
        setLoading(true);
        try {
            for (const deleteID of deleteIDs) {
                const response = await axios.post(
                    `/api/admin/invoice/delete`,
                    { data: deleteID }
                );
                toast({
                    title: `Removing ${dataLength} Invoice Sucess!`,
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
                title: 'Error Deleting Invoice!',
                description: 'An error occurred while deleting Invoice.',
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
            {
                loading ? (
                    <Loaders />
                ) : (
                    <AlertDialog open={open} setOpen={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-bold">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. It will be deleted permanently.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
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
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    <p className=' font-normal text-xs'>Delete</p>
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog >
                )
            }
        </>
    )
}

