
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

export const ActivateUser = ({ open, setOpen, deleteID, reloadData }) => {
    const { toast } = useToast()
    const onClose = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)
    console.log("Delete ID", deleteID)
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/setVerified`,
                {
                    data: deleteID,
                    status: 'active'
                }
            );
            setLoading(false)
            toast({
                title: `Succes, Customer has been activated!`,
                description: response.data.message,
                status: 'success',
            });
            reloadData()
            onClose()
        } catch (error) {
            setLoading(false)
            toast({
                title: 'Error activated Customer!',
                description: 'An error occurred while activated Customer.',
                status: 'error',
            });
            console.log('Error:', error);
        }
    };

    const handleSubmit = () => {
        fetchData()
    }

    return (
        <>
            {
                loading ? (
                    <Loaders />
                ) : (
                    <AlertDialog open={open} setOpen={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-bold">Activated This User?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This Customer will be Activated.
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
                                    className="w-full" s
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    <p className=' font-normal text-xs'>Activated!</p>
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog >
                )
            }
        </>
    )
}
