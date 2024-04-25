import React, { useEffect, useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loaders } from '@/components/ui/loaders';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const formSchema = yup.object().shape({
    service_id: yup.array(),
    category_id: yup.string().required(),
})

export const RemoveDialog = ({ open, setOpen, serviceID, reloadData, category_id }) => {
    console.log("🚀 ~ MoveService ~ serviceID:", serviceID)
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const handleRemove = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `/api/admin/product/remove`,
                { id: serviceID }
            )
            console.log("🚀 ~ handleRemove ~ response:", response)
            const responseData = await response.data;
            if (responseData.data.status === true) {
                toast.success(response.data.message)
                reloadData()
                setOpen(false)
                setLoading(false)
            } else {
                toast.error(response.data.message)
                setLoading(false)
            }
        } catch (error) {

        }
    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            {loading ? (
                <Loaders />
            ) : (
                <AlertDialog open={open} setOpen={setOpen}>
                    <AlertDialogContent className="w-[350px]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="font-bold text-left">
                                Remove item from category
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                this action will remove the item from the category
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className={"mt-2"}>
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="w-full"
                                type="button"
                                onClick={onClose}
                            >
                                <p className=" font-normal text-xs">Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                type="button"
                                onClick={handleRemove}
                            >
                                <p className=" font-normal text-xs">Remove</p>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

