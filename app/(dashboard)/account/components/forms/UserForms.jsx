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
    firstName: yup.string().required().min(5, "min 5 character").max(25, "max 25 character"),
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



export const UserForms = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            firstName: "",
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
                    className='flex gap-3 flex-col'
                    action="">
                    <div className="nameWrapper flex flex-row gap-4 w-full text-sm">
                        <FormField
                            className="w-full"
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-sm">
                                        <FormLabel className="text-sm">First Name</FormLabel>
                                        <FormControl>
                                            <Input id="firstName" className="text-sm" placeholder="john" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="lastName"
                            className="w-full text-sm"
                            control={form.lastName}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-sm">
                                        <FormLabel className="text-sm">Last Name</FormLabel>
                                        <FormControl>
                                            <Input id="lastName" className="text-sm" placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>

                    <FormField
                        name="password"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl >
                                        <Input type="password" id="password"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        name="confirmPassword"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Repeat Password</FormLabel>
                                    <FormControl >
                                        <Input type="password" id="confirmPassword"  {...field} />
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
                                        <Input type="email" id="email"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        name="phoneNumber"
                        className="w-full text-sm"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl >
                                        <Input type="number" className="text-xs" id="phoneNumber"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <div className=" flex justify-end items-end py-[20px]">
                        <Button
                            variant="destructive"
                            type="submit"
                            size="sm"
                        >
                            <p className=' font-normal text-xs'>Save Change</p>
                        </Button>
                    </div>

                </form>
            </Form >
        </>
    )
}
