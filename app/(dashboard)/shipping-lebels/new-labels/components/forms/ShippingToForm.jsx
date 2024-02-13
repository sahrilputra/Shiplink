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

const formSchema = yup.object().shape({
    full_name: yup.string().required().max(50, "character is too long"),
    company_name: yup.string(),
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

export const ShippingToForm = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            full_name: "",
            company_name: "",
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
                    className='flex gap-1 flex-col'
                    action="">
                    <div className="gap-1 flex flex-col">
                        <div className="profile flex flex-col gap-1 w-full">
                            <FormField
                                className="w-full"
                                name="full_name"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Full Name</FormLabel>
                                            <FormControl>
                                                <Input id="full_name" placeholder="john" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className="w-full"
                                name="company_name"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Company Name</FormLabel>
                                            <FormControl>
                                                <Input id="full_name" placeholder="john" {...field} />
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
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Street Address</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="address" placeholder="Street Address"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="wrap flex flex-row items-center gap-2">
                            <FormField
                                name="city"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">City</FormLabel>
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
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">State / Province</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="state" placeholder="State / Province"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>

                        <div className="wrap flex flex-row items-center gap-2">
                            <FormField
                                name="country"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Country</FormLabel>
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
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Zip / Postal Code</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="state" placeholder="Zip"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="address flex flex-row w-full gap-2">
                            <FormField
                                name="email"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Email</FormLabel>
                                            <FormControl >
                                                <Input type="email" id="email" placeholder="Emails" {...field} />
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
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className="font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input type="number" id="phone" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />

                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
