import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loaders } from "@/components/ui/loaders"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
const formSchema = yup.object().shape({
    status: yup.string(),
    invoiceID: yup.string(),
})

import React from 'react'

export function UpdateInvoiceStatus({ open, setOpen, dataID = null, reload }) {

    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [isselectedStatus, setSelectedStatus] = useState(null)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            status: "",
            invoiceID: dataID || '',
        },
        mode: "onChange",
    })
    const handleSave = async (formData) => {
        console.log("dikirim", formData)
        setLoading(true)
        formData.invoiceID = dataID;
        try {
            const response = await axios.post(
                `/api/admin/invoice/setStatus`,
                formData
            );
            toast({
                title: `Success New Status For ${dataID} !`,
                description: response.data.message,
                status: 'success',
            });
            setLoading(false)
            close();
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error While Update Status!',
                description: `Error : ${error.message}`,
                status: 'error',
            });
        }
    };
    const close = () => {
        setOpen(false)
    }
    return (
        <>
            {loading && <Loaders />}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col gap-2 font-bold">
                                <p>Update Status</p>
                                <p>For Invoice #{dataID}</p>
                            </div>

                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}
                                className='flex gap-4 flex-col'
                                action="">
                                <div className="w-[50px] text-myBlue border-b border-myBlue text-sm text-center">
                                    <p>Status</p>
                                </div>
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <div className="flex flex-col gap-2 pt-2 pb-4">
                                    <div className="w-[100%]">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a status for invoice" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Paid">Paid</SelectItem>
                                                            <SelectItem value="Cancel">Cancel</SelectItem>
                                                            <SelectItem value="Over Due Date">Over Due Date</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full gap-5">
                                    <Button
                                        type="button"
                                        variant="redOutline"
                                        className="w-full"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        variant="destructive"
                                    >Save changes
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
