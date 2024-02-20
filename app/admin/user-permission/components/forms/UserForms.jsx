/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'
const formSchema = yup.object().shape({
    fullName: yup.string().required().max(50, "character is too long"),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "min 8 character"),
    phoneNumber: yup.string().required(),
    role: yup.string().required(),
    warehouse: yup.string().required(),
    warehouseID: yup.string().required(),

})

export const UserPermissionForms = ({ isDisable, data = null, handleDisable, isSkleton }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            role: data?.role || "",
            warehouse: data?.warehouse_name || "",
            warehouseID: data?.warehouse_id || "",
        },
        disabled: isDisable,
        mode: "onChange",
    })

    useEffect(() => {
        form.setValue("fullName", data?.full_name || "")
        form.setValue("email", data?.email || "")
        form.setValue("password", data?.password || "")
        form.setValue("phoneNumber", data?.phone_number || "")
        form.setValue("role", data?.role || "")
        form.setValue("warehouse", data?.warehouse_name || "")
        form.setValue("warehouseID", data?.warehouse_id || "")
    }, [data])


    console.log("then result", data)
    const handleCancel = () => {
        handleDisable()
    }

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
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full text-xs">
                                                <FormLabel className=" text-xs font-bold">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        id="fullName"
                                                        placeholder="john"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
                                </>
                            )}
                        />

                        <FormField
                            name="email"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full">
                                                <FormLabel className=" text-xs font-bold">Email</FormLabel>
                                                <FormControl >
                                                    <Input

                                                        size="xs"
                                                        className="px-1.5"
                                                        type="email"
                                                        id="address"
                                                        placeholder="Email"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
                                </>
                            )}
                        />
                        <FormField
                            name="password"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full">
                                                <FormLabel className=" text-xs font-bold">Password</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        type="password"
                                                        id="address"
                                                        placeholder="password"  {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
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
                                        {
                                            isSkleton ? (
                                                <Skeleton className="w-full h-8 mt-2" />
                                            ) : (
                                                <FormItem className="w-full">
                                                    <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                                    <FormControl >
                                                        <Input
                                                            size="xs"
                                                            className="px-1.5"
                                                            type="number"
                                                            id="phoneNumber"
                                                            placeholder="Phone Number"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )
                                        }

                                    </>
                                )}
                            />
                            <FormField
                                name="role"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        {isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full">
                                                <FormLabel className=" text-xs font-bold">Role</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        type="text"
                                                        id="role"
                                                        placeholder="Role" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}

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
                                    {isSkleton ? (
                                        <Skeleton className="w-full h-8 mt-2" />
                                    ) : (
                                        <FormItem className="w-full">
                                            <FormLabel className=" text-xs font-bold">Warehouse</FormLabel>
                                            <FormControl>
                                                <Input
                                                    size="xs"
                                                    className="px-1.5"
                                                    type="text"
                                                    id="warehouse"
                                                    placeholder="Warehouse"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )
                                    }
                                </>
                            )}
                        />



                        <div className="w-full flex flex-row items-end gap-3 justify-end py-3">
                            {
                                isDisable ? (
                                    <></>
                                ) : (
                                    <>
                                        <Button
                                            variant="redOutline"
                                            type="button"
                                            className=" w-24 h-8 text-xs"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            type="button"
                                            className=" w-24 h-8 text-xs"
                                        >
                                            Save
                                        </Button>
                                    </>

                                )
                            }
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
