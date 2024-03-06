'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Loaders } from '@/components/ui/loaders'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
const formSchema = yup.object().shape({
    email: yup.string().required(),
})


export const EmailDiallog = ({ open, setOpen }) => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    })

    const { toast } = useToast()
    const onClose = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (formData) => {
        console.log("🚀 ~ handleSubmit ~ formData:", formData)
        setLoading(true);
        try {
            await axios.post(
                `/api/customerAPI/resendVerification`,
                {
                    email: form.watch('email'),
                }
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                setLoading(false)
                setOpen(false)
                setLoading(false)
                toast({
                    title: 'Email Sended! Please Check Your Email',
                    description: response.data.message,
                    status: 'success',
                });
            })
        } catch (error) {
            setLoading(false)
            console.log('Error:', error);
            toast({
                title: 'Error!',
                description: error.message,
                status: 'success',
            });
        }
    }
    return (
        <>
            {
                loading ? (
                    <Loaders />
                ) : (
                    <Dialog open={open} onOpenChange={setOpen}
                        className="w-max"
                    >
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-bold">
                                    <p>Enter Your Email</p>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(handleSubmit)}
                                        className=''
                                        action="">
                                        <div className="flex flex-col gap-2 text-xs">
                                            <div className="flex flex-row justify-between gap-3 py-3">
                                                <FormField
                                                    name="email"
                                                    className="w-full text-neutral-900"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-neutral-900">
                                                                <FormLabel className="text-sm">Email</FormLabel>
                                                                <FormControl >
                                                                    <Input type="emai" id="row" placeholder="Email" className="text-sm"  {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            <div className=" flex flex-row justify-between gap-2 ">
                                                <Button
                                                    variant="redOutline"
                                                    size="sm"
                                                    type="button"
                                                    className="w-full"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <p className=' font-normal text-xs'>Cancel</p>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="w-full"
                                                    type="submit"
                                                >
                                                    <p className=' font-normal text-xs'>Sent</p>
                                                </Button>
                                            </div>

                                        </div>

                                    </form>
                                </Form >
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            }

        </>
    )
}