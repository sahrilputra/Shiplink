import React, { useState } from 'react'
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
import axios from "axios";

const formSchema = yup.object().shape({
    row: yup.string().required(),
    section: yup.string().required(),
    level: yup.string().required(),
})


export const CreateNewBinForms = ({ close, data = null, setLoading, reloadData }) => {
    const { toast } = useToast()

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            row: "",
            section: "",
            level: "",
        },
        mode: "onChange",
    })

    const handleSave = async (formData) => {
        console.log("submitting", formData)
        setLoading(true)
        try {
            formData.bins_id = "";
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/bin_manager/setData`,
                formData
            );

            toast({
                title: 'New Bins created successfully!',
                description: response.data.message,
                status: 'success',
            });
            setLoading(false)
            close();
            reloadData(true)
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating bins!',
                description: 'An error occurred while creating the bins.',
                status: 'error',
            });
        }
    };

    console.log("wathcing form", form.formState.isSubmitting)
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className=''
                    action="">
                    <div className="flex flex-col gap-2 text-xs">
                        <div className="flex flex-row justify-between gap-3 py-3">
                            <FormField
                                name="row"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm"  >Row</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="row" placeholder="Row" className="text-sm"  {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="section"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm"  >Section</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="section" placeholder="Section" className="text-sm"  {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="level"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm"  >Level</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="level" placeholder="Level" className="text-sm"  {...field} />
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
                                    close()
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
        </>
    )
}