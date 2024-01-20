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
    fullName: yup.string().required().max(50, "character is too long"),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
    zipCode: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    isPrimary: yup.boolean(),
})



export const NewAddress = ({ close, data = null }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: data?.fullName || "",
            address: data?.address || "",
            city: data?.city || "",
            state: data?.state || "",
            country: data?.country || "",
            zipCode: data?.postalCode || "",
            email: data?.email || "",
            phoneNumber: data?.phone || "",
            isPrimary: data?.isPrimary || "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-4 flex-col'
                    action="">

                    <div className="profile flex flex-col gap-4 w-full">
                        <FormField
                            className="w-full"
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input id="fullName" placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
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

                    </div>
                    <div className="address flex flex-col w-full gap-4">
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
                        <div className="wrap flex flex-col items-center gap-4">
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

                        <div className="checkbox flex">
                            <FormField
                                name="isPrimary"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full flex flex-row gap-3 items-center">
                                            <FormControl >
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>Make this as primary address</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>

                        <div className=" flex justify-between items-end mt-[20px]">
                            <Button
                                variant="redOutline"
                                type="submit"
                                onClick={close}
                            >
                                <p className=' font-normal '>Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                type="submit"

                            >
                                <p className=' font-normal '>Save</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
