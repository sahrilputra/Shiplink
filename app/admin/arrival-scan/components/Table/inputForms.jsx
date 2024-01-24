import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = yup.object().shape({
    Qty: yup.number(),
    value: yup.number(),
    description: yup.string(),
    HSDescription: yup.string(),
    HSCode: yup.string(),
    MadeIn: yup.string(),
})

export const QtyForm = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            Qty: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col'
                    action="">
                    <div className="flex flex-row gap-4">
                        <FormField
                            className="w-full text-sm"
                            name="Qty"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className=" text-sm">
                                        <FormControl>
                                            <Input id="Qty" className="text-sm" placeholder="0" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                </form>
            </Form >
        </>
    )
}

export const ValueForms = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            value: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Input id="value" className="text-sm" placeholder="0" type="number" {...field} />
        </>
    )
}

export const DescriptionForms = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            description: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col'
                    action="">
                    <div className="flex flex-row gap-4">
                        <FormField
                            className="w-full text-sm"
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className=" text-sm">
                                        <FormControl>
                                            <Input id="description" className="text-sm" placeholder="description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                </form>
            </Form >
        </>
    )
}


export const HSDescriptionForms = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            HSDescription: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col'
                    action="">
                    <div className="flex flex-row gap-4">
                        <FormField
                            className="w-full text-sm"
                            name="HSDescription"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className=" text-sm">
                                        <FormControl>
                                            <Input id="HSDescription" className="text-sm" placeholder="description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                </form>
            </Form >
        </>
    )
}

export const HSCodeForms = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            HSCode: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col'
                    action="">
                    <div className="flex flex-row gap-4">
                        <FormField
                            className="w-full text-sm"
                            name="HSCode"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className=" text-sm">
                                        <FormControl>
                                            <Input id="HSCode" className="text-sm" placeholder="812.993.232" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                </form>
            </Form >
        </>
    )
}


export const MadeInForms = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            MadeIn: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col'
                    action="">
                    <div className="flex flex-row gap-4">
                        <FormField
                            className="w-full text-sm"
                            name="MadeIn"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className=" text-sm">
                                        <FormControl>
                                            <Input id="MadeIn" className="text-sm" placeholder="CAD" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                </form>
            </Form >
        </>
    )
}


