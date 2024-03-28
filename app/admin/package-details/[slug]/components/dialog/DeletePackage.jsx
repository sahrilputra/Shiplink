
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
import { useRouter } from 'next/navigation';

export const DeletePackage = ({ open, setOpen, deleteID }) => {
    const router = useRouter();
    const { toast } = useToast()
    const onClose = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)
    console.log("Delete ID", deleteID)

    const fetchData = async (deleteIDs) => {
        setLoading(true);
        try {
            for (const deleteID of deleteIDs) {
                const response = await axios.post(
                    `/api/admin/packages/delete`,
                    { data: deleteID }
                );
                toast({
                    title: `Succes, Package has been Removed!`,
                    description: response.data.message,
                    status: 'success',
                });
            }
            setLoading(false);
            onClose();
            router.push('/admin/package-details');
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Error Deleting Package!',
                description: 'An error occurred while Deleting Package.',
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
                                    This action cannot be undone. This Package will be deleted permanently.
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
