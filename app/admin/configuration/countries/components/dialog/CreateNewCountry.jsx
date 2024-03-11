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
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Loaders } from '@/components/ui/loaders'

const formSchema = yup.object().shape({
    country_name: yup.string().required(),
    country_code: yup.string().required(),
    country_numeric: yup.string().required(),

})

export const CreateNewCountry = ({ open, setOpen, reloadData }) => {
    const onClose = () => {
        setOpen(false)
    }
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            country_name: "",
            country_code: "",
            country_numeric: "",
        },
        mode: "onChange",
    })
    const [loading, setLoading] = useState(false)

    const handleSave = async (formData) => {
        setLoading(true);
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/config/countries/setData`,
                formData
            );
            setLoading(false);
            toast({
                title: 'Country created successfully!',
                description: response.data.message,
                status: 'success',
            });
            onClose();
            reloadData();
        } catch (error) {
            console.log('Error', error);
            setLoading(false);
            toast({
                title: 'Error creating country',
                description: 'An error occurred while creating the country.',
                status: 'error',
            });
        }
    };



    return (
        <>
            {loading ? (
                <Loaders />
            ) : (
                <Dialog open={open} onOpenChange={setOpen}
                    className="w-max"
                >
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="font-bold">
                                <p>Create New Country</p>
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
                                            <div className="text-xs py-2">
                                                We using Alpha-3 code, see all list code in <a className='text-xs text-myBlue underline ' href="https://countrycode.org/"> here </a>
                                             
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
            )}
        </>
    )
}