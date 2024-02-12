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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import InputMask from 'react-input-mask';
import axios from "axios";

const formSchema = yup.object().shape({
    country_id: yup.string(),
    country_name: yup.string(),
    country_code: yup.string(),
    country_numeric: yup.string(),
    status: yup.string()
})

export const EditCountryDialog = ({ open, setOpen, data = null, reloadData }) => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            country_id: data?.country_id || "",
            country_name: data?.country_name || "",
            country_code: data?.country_code || "",
            country_numeric: data?.country_numeric || "",
            status: data?.status || "",
        },
        mode: "onChange",
    })

    const onClose = () => {
        setOpen(false)
    }

    const { toast } = useToast()

    const handleSave = async (formData) => {
        try {
            formData.action = 'edit';
            const response = await axios.post(
                `/api/admin/config/countries/setData`,
                formData
            );
            toast({
                title: 'Success Edited Country!',
                description: response.data.message,
                status: 'success',
            });
            onClose();
            reloadData();
        } catch (error) {
            console.log('Error', error);
            toast({
                title: 'Error creating country',
                description: 'An error occurred while creating the country.',
                status: 'error',
            });
        }
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}
            className="w-max"
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Edit Country</p>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className=" flex justify-center items-center mx-auto">
                    <div className="flex justify-center items-center mx-auto">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}
                                className=''
                                action="">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row gap-4 text-xs">
                                        <FormField
                                            className="w-full"
                                            name="country_name"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                                        <FormLabel className="text-sm">Country Name</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" id="country_name" placeholder="" className="text-xs p-0 px-2" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />

                                        <FormField
                                            name="country_code"
                                            className="w-full text-neutral-900"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                                        <FormLabel className="text-sm"  >Country Code</FormLabel>
                                                        <FormControl >
                                                            <InputMask
                                                                mask="aaa"
                                                                maskPlaceholder="000"
                                                                {...field}
                                                                className='tracking-widest'
                                                            >
                                                                {(inputProps) => (
                                                                    <Input
                                                                        className="text-xs p-0 py-1 px-2 focus:ring-offset-0 tracking-widest"
                                                                        id="country_code"
                                                                        type="text" // Ubah tipe input menjadi teks
                                                                        placeholder="_ _ _" // Placeholder yang sesuai dengan format
                                                                        {...inputProps}
                                                                    />
                                                                )}
                                                            </InputMask>
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            name="country_numeric"
                                            className="w-full text-neutral-900"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                                        <FormLabel className="text-sm"  >Country Number</FormLabel>
                                                        <FormControl >
                                                            <InputMask
                                                                mask="999"
                                                                maskPlaceholder=""
                                                                className='tracking-widest'
                                                                {...field}
                                                            >
                                                                {(inputProps) => (
                                                                    <Input
                                                                        className="text-xs p-0 py-1 px-2 focus:ring-offset-0 tracking-widest"
                                                                        id="hsCode"
                                                                        type="text" // Ubah tipe input menjadi teks
                                                                        placeholder="_ _ _" // Placeholder yang sesuai dengan format
                                                                        {...inputProps}
                                                                    />
                                                                )}
                                                            </InputMask>

                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="text-xs py-2">We using Alpha-3 code, see all list code in <span className='text-xs text-myBlue underline'>here</span> </div>
                                    <div className="py-1 pb-3">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="w-full text-neutral-900 space-y-1">
                                                    <FormLabel className="text-sm ">Status</FormLabel>
                                                    <Select className="text-xs" onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl className="text-xs">
                                                            <SelectTrigger className="text-xs">
                                                                <SelectValue className="text-xs" placeholder="status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="Active">Active</SelectItem >
                                                            <SelectItem className="text-xs" value="Disable">Disable</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription className="text-xs">
                                                        Warning! All the province in this country will not available to use anymore, Please Activate the status to using this country again
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className=" flex flex-row justify-between gap-2 ">
                                        <Button
                                            variant="redOutline"
                                            size="sm"
                                            className="w-full"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onClose()
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
                                            <p className=' font-normal text-xs'>Save</p>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form >
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}