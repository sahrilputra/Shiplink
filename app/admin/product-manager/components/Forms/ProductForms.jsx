import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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

const formSchema = yup.object().shape({
    productID: yup.string(),
    item: yup.number().required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().email().required(),
    image: yup.string().required(),
})



export const NewProductForms = ({ close, data = null }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            productID: data?.fullName || "",
            item: data?.address || "",
            brand: data?.city || "",
            model: data?.state || "",
            category: data?.country || "",
            description: data?.postalCode || "",
            price: data?.email || "",
            image: data?.phone || "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-4 flex-col'
                    action="">

                    <div className="profile flex flex-row gap-4 w-full">
                        <FormField
                            className="w-full"
                            name="productID"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">Product ID</FormLabel>
                                        <FormControl>
                                            <Input id="productID" placeholder="#1231" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="item"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">Item #</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="item" placeholder="#2321"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="wrap flex flex-row items-center gap-4">
                        <FormField
                            name="brand"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">Brand *</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="brand" placeholder="Select Brand" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="model"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">Model *</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="brand" placeholder="Model" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="category"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">Category *</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="category" placeholder="Model" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="wrap flex flex-col items-center gap-4">
                        <FormField
                            name="description"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">Description *</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="country" placeholder="Set a description for better visibility." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="flex flex-row gap-4 w-full">
                            <FormField
                                name="price"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel className="font-bold">Price *</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="price" placeholder="$ 12.99"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="image"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel className="font-bold">Image *</FormLabel>
                                            <FormControl >
                                                <Input type="file" id="price" placeholder=""  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className=" flex justify-end items-end mt-[20px] w-full">
                        <Button
                            variant="destructive"
                            type="submit"
                            className="px-10"

                        >
                            <p className=' font-normal '>Save</p>
                        </Button>
                    </div>

                </form>
            </Form >
        </>
    )
}
