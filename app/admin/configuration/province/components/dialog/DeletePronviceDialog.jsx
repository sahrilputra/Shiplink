import React from 'react'
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

export const DeletePronviceDialog = ({ open, setOpen, deleteID, reloadData }) => {
    const { toast } = useToast()
    const onClose = () => {
        setOpen(false)
    }

    console.log("Delete ID", deleteID)
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/config/province/delete`,
                deleteID
            );
            toast({
                title: `Province ${deleteID} Deleted!`,
                description: response.data.message,
                status: 'success',
            });
            reloadData()
            onClose()
        } catch (error) {
            toast({
                title: 'Error Deleting Province!',
                description: 'An error occurred while Deleting Province.',
                status: 'error',
            });
            console.log('Error:', error);
        }
    };

    const handleSubmit = () => {
        fetchData()
    }

    return (
        <AlertDialog open={open} setOpen={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This Province  will be deleted permanently.
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
