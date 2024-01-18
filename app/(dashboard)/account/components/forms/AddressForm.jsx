import React, { useState } from 'react'
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
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "min 8 character"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
    country: yup.string().required(),

})



export const AddressForms = () => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-4 flex-row'
                    action="">

                    <div className="profile flex flex-col gap-4 w-full">
                        <FormField
                            className="w-full"
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input id="name" placeholder="john" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="phone"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="number" id="phone" placeholder="Phone Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="email"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl >
                                            <Input type="email" id="email" placeholder="Emails" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="address flex flex-col w-full gap-4">


                        <FormField
                            name="address"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="address" placeholder="Street Address"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="city"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>City</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="city" placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="state"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>State / Province</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="state" placeholder="State / Province"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="country"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Country</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="country" placeholder="Country" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="zipCode"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Zip / Postal Code</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="state" placeholder="Zip"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className=" flex justify-end items-end ">
                            <Button
                                variant="destructive"
                                type="submit"

                            >
                                <p className=' font-normal '>Save Change</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
