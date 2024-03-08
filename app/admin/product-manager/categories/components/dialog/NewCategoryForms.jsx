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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = yup.object().shape({
    categories: yup.string().required(),
    category_type: yup.string().required(),
    action: yup.string()
})


export const NewCategoryForms = ({ close, data = null, setLoading, reloadData }) => {
    const { toast } = useToast()

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            categories: "",
            category_type: "",
            action: "",
        },
        mode: "onChange",
    })

    const handleSave = async (formData) => {
        console.log("submitting", formData)
        setLoading(true)
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/category/setData`,
                formData
            );

            toast({
                title: 'New Category created successfully!',
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
                title: 'Error while creating Category!',
                description: 'An error occurred while creating the Category.',
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
                        <div className="flex flex-col justify-between gap-3 py-3">
                            <FormField
                                name="categories"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm">Category Name</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="row" placeholder="Category Name" className="text-sm"  {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="category_type"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem>
                                            <FormLabel className="w-full text-neutral-900 text-sm">Select Category Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="px-3 h-[42px] rounded">
                                                        <SelectValue defaultValue={"Product"} placeholder="Select Category Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Product">Product</SelectItem>
                                                    <SelectItem value="Services">Services</SelectItem>
                                                </SelectContent>
                                            </Select>
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