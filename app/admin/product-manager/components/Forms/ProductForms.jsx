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
    price: yup.number().required(),
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
                    className='flex gap-2 flex-col'
                    action="">
                    <div className="profile flex flex-row gap-2 w-full">
                        <FormField
                            className="w-full text-xs"
                            name="productID"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs">
                                        <FormLabel className="font-bold">Product ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="new"
                                                id="productID" className="text-xs" placeholder="#1231" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
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
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Item #</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="item" className="text-xs" placeholder="#2321"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="wrap flex flex-row items-center gap-2">
                        <FormField
                            name="brand"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Brand *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="brand" className="text-xs" placeholder="Select Brand" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
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
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Model *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="brand" className="text-xs" placeholder="Model" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
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
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Category *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="category" className="text-xs" placeholder="Model" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="wrap flex flex-col items-center gap-2">
                        <FormField
                            name="description"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Description *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="country" className="text-xs" placeholder="Set a description for better visibility." {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="flex flex-row gap-2 w-full">
                            <FormField
                                name="price"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="text-xs w-full">
                                            <FormLabel className="font-bold">Price *</FormLabel>
                                            <FormControl >
                                                <Input
                                                    size="new"
                                                    type="text" id="price" className="text-xs" placeholder="$ 12.99"  {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="image"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 text-xs">
                                            <FormLabel className="font-bold">Image *</FormLabel>
                                            <FormControl>
                                                <div className='rounded-md border border-slate-200 p-0'>
                                                    <Input
                                                        id="wholeBox"
                                                        type="file"
                                                        className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0  file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs "
                                                        placeholder="Upload Image"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className=" flex justify-end items-end  w-full">
                        <Button
                            variant="destructive"
                            type="submit"
                            className="px-10"
                            size="xs"
                        >
                            <p className=' font-normal text-xs'>Save</p>
                        </Button>
                    </div>

                </form>
            </Form >
        </>
    )
}
