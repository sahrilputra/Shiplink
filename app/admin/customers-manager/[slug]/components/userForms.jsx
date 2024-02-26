'use client'
import React, { useState, useEffect } from 'react'
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

const formSchema = yup.object().shape({
    name: yup.string().required().max(50, "character is too long"),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
    country: yup.string().required(),

})



export const UserProfileForms = ({ data, isDisable, setCancel }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: data?.customer_name || "",
            email: data?.email || "",
            confirmPassword: "",
            phoneNumber: data?.phone_number || "",
            address: data?.address || "",
            city: data?.city || "",
            state: data?.state || "",
            zipCode: data?.zipCode || "",
            country: data?.country || "",
        },
        mode: "onChange",
        disabled: isDisable,
    })

    useEffect(() => {
        form.setValue('name', data?.customer_name)
        form.setValue('email', data?.email)
        form.setValue('phoneNumber', data?.phone_number)
        form.setValue('address', data?.address)
        form.setValue('city', data?.city)
        form.setValue('state', data?.province_name)
        form.setValue('zipCode', data?.postal_code)
        form.setValue('country', data?.country_name)

    }, [data])

    return (
        <>
            <Form {...form}>
                <form
                    className={`flex gap-2 flex-col  ${isDisable ? "opacity-85" : " "}`}
                    action="">
                    <div className="bg-white rounded-lg border border-neutral-200 border-opacity-90 w-full px-4 py-3 gap-1 flex flex-col">
                        <FormField
                            className="w-full"
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs space-y-1 ">
                                        <FormLabel className=" text-xs font-bold">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="new"
                                                className="px-1.5" id="name" placeholder="john" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />



                        <FormField
                            name="address"
                            className="w-full space-y-1"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full space-y-1 ">
                                        <FormLabel className=" text-xs font-bold ">Street Address</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                className="px-1.5" type="text" id="address" placeholder="Street Address"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="profile flex flex-row gap-2 w-full">
                            <FormField
                                name="email"
                                className="w-full space-y-1 "
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className=" text-xs font-bold">Email</FormLabel>
                                            <FormControl >
                                                <Input
                                                    size="new"
                                                    className="px-1.5" type="email" id="email" placeholder="Emails" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="phone"
                                className="w-full space-y-1 "
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    size="new"
                                                    className="px-1.5" type="number" id="phone" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="address flex flex-col w-full gap-2">
                            <div className="wrap flex flex-row items-center gap-2">
                                <FormField
                                    name="city"
                                    className="w-full space-y-1 "
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full space-y-1">
                                                <FormLabel className=" text-xs font-bold">City</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="new"
                                                        className="px-1.5" type="text" id="city" placeholder="City" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    name="state"
                                    className="w-full space-y-1"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full space-y-1">
                                                <FormLabel className=" text-xs font-bold">State / Province</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="new"
                                                        className="px-1.5" type="text" id="state" placeholder="State / Province"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="wrap flex flex-row items-center gap-2">
                                <FormField
                                    name="zipCode"
                                    className="w-full"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full space-y-1">
                                                <FormLabel className=" text-xs font-bold">Zip / Postal Code</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="new"
                                                        className="px-1.5" type="text" id="state" placeholder="Zip"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    name="country"
                                    className="w-full space-y-1"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full space-y-1">
                                                <FormLabel className=" text-xs font-bold">Country</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="new"
                                                        className="px-1.5" type="text" id="country" placeholder="Country" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={`flex flex-row w-full items-end justify-end gap-5 pt-3 ${isDisable ? "hidden" : ""}`}>
                            <Button
                                variant="redOutline"
                                size="xs"
                                type="button"
                                onClick={setCancel}
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                size="xs"
                            >
                                <p className='text-xs'>Save</p>
                            </Button>
                        </div>
                    </div>
                </form>
            </Form >
        </>
    )
}
