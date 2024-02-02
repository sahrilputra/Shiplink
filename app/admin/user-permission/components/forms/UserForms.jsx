'use client'
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
    fullName: yup.string().required().max(50, "character is too long"),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "min 8 character"),
    phoneNumber: yup.string().required(),
    role: yup.string().required(),
    warehouse: yup.string().required(),
    warehouseID: yup.string().required(),

})



export const UserPermissionForms = () => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            role: "",
            warehouse: "",
            warehouseID: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-2 flex-col'
                    action="">
                    <div className="bg-white rounded-lg border border-neutral-200 border-opacity-90 w-full px-4 py-3">
                        <FormField
                            className="w-full"
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs">
                                        <FormLabel className=" text-xs font-bold">Full Name</FormLabel>
                                        <FormControl>
                                            <Input id="fullName" placeholder="john" {...field} />
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
                                        <FormLabel className=" text-xs font-bold">Email</FormLabel>
                                        <FormControl >
                                            <Input type="email" id="address" placeholder="Email"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="password"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className=" text-xs font-bold">Password</FormLabel>
                                        <FormControl >
                                            <Input type="password" id="address" placeholder="password"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="profile flex flex-row gap-2 w-full">
                            <FormField
                                name="phoneNumber"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="phoneNumber" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="role"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel className=" text-xs font-bold">Role</FormLabel>
                                            <FormControl>
                                                <Input type="text" id="role" placeholder="Role" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <FormField
                            name="warehouse"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className=" text-xs font-bold">Warehouse</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="warehouse" placeholder="Warehouse" {...field} />
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
