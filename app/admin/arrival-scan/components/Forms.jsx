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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = yup.object().shape({
    customerID: yup.string(),
    fullName: yup.string(),
    trackingBarcode: yup.string(),
    phoneNumber: yup.string(),
    email: yup.string().email(),
    carrier: yup.string(),
    length: yup.number(),
    width: yup.number(),
    height: yup.number(),
    heightType: yup.string(),
    weight: yup.string(),
    weightType: yup.string(),

})



export const ArrivalForms = () => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            customerID: "",
            fullName: "",
            trackingBarcode: "",
            phoneNumber: "",
            email: "",
            carrier: "",
            length: "",
            width: "",
            height: "",
            heightType: "",
            weight: "",
            weightType: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col text-zinc-600'
                    action="">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col justify-start gap-2 w-full">
                            <div className="nameWrapper flex flex-row gap-4 w-full text-sm">
                                <FormField
                                    className="w-full text-sm"
                                    name="customerID"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-[50%] text-sm">
                                                <FormLabel className="text-sm font-bold">Customer Unit ID</FormLabel>
                                                <FormControl>
                                                    <Input id="customerID" className="text-sm" placeholder="Ex. C12345678" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    name="fullName"
                                    className="w-[60%] text-sm"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full text-sm">
                                                <FormLabel className="text-sm font-bold">Customer Full Name</FormLabel>
                                                <FormControl>
                                                    <Input id="fullName" className="text-sm" placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="nameWrapper flex flex-row gap-4 w-[100%] text-sm ">
                                <FormField
                                    className="w-[40%] text-sm"
                                    name="phoneNumber"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-[50%] text-sm">
                                                <FormLabel className="text-sm font-bold">Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input id="phoneNumber" type="number" className="text-sm" placeholder="+1 21xxxx" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    className="w-full text-sm"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full text-sm">
                                                <FormLabel className="text-sm font-bold">Email</FormLabel>
                                                <FormControl>
                                                    <Input id="email" type="email" className="text-sm" placeholder="customer@shiplink.ca" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-2 w-full">
                            <div className="nameWrapper flex flex-row gap-2 w-[100%] text-sm text-zinc-600">
                                <FormField
                                    className="w-full"
                                    name="length"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-[60%] text-sm">
                                                <FormLabel className="text-sm font-bold text-zinc-600">Barcode / Tracking</FormLabel>
                                                <FormControl>
                                                    <Input id="firstName" className="text-sm" placeholder="Eg. SA4S21JK21" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    name="carrier"
                                    className="w-full text-sm"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-[40%] text-sm" >
                                                <FormLabel className="text-sm font-bold text-zinc-600">Select Carrier</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    control={form.control}
                                                    defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Purolator" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Purolator">Purolator</SelectItem>
                                                        <SelectItem value="Feedex">Feedex</SelectItem>
                                                        <SelectItem value="Amazon">Amazon</SelectItem>
                                                        <SelectItem value="DHL">DHL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="nameWrapper flex flex-row gap-4 w-[100%] text-sm text-zinc-600">
                                <div className="flex flex-col gap-2">
                                    <FormLabel className="text-sm font-bold text-zinc-600">Package Dimension</FormLabel>
                                    <div className="flex flex-row gap-2 w-full">
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="length"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-sm">
                                                        <FormControl>
                                                            <Input id="length" className="text-sm" type="number" placeholder="length" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="width"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-sm">
                                                        <FormControl>
                                                            <Input id="width" className="text-sm" type="number" placeholder="width" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="height"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-sm">
                                                        <FormControl>
                                                            <Input id="height" type="number" className="text-sm" placeholder="height" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />

                                        <FormField
                                            name="heightType"
                                            className="w-full text-sm"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-[40%] text-sm" >
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            control={form.control}
                                                            defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="in" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="mm">mm</SelectItem>
                                                                <SelectItem value="cm">cm</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="weight"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-full text-sm">
                                                        <FormControl>
                                                            <Input id="weight" className="text-sm" placeholder="weight" type="number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            name="weightType"
                                            className="w-full text-sm"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-[40%] text-sm" >
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            control={form.control}
                                                            defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="ibs" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="ibs">ibs</SelectItem>
                                                                <SelectItem value="kg">kg</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <FormField
                            className="w-full flex flex-row justify-center items-end"
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-sm">
                                        <FormLabel className="text-sm font-bold">Whole Box Image</FormLabel>
                                        <FormControl>
                                            <Input id="picture" type="file" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full flex flex-row justify-center items-end"
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-sm">
                                        <FormLabel className="text-sm font-bold">Label Close Up</FormLabel>
                                        <FormControl>
                                            <Input id="picture" type="file"
                                                onChange={(e) => {
                                                    // const file = e.target.files[0];
                                                    // const imageUrl = URL.createObjectURL(file);
                                                    // // Do something with the imageUrl, such as displaying it in an <img> tag
                                                    // console.log(imageUrl);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full flex flex-row justify-center items-end"
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-sm">
                                        <FormLabel className="text-sm font-bold">Content Images</FormLabel>
                                        <FormControl>
                                            <Input id="picture" type="file" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>

                    {/* 
                    <div className=" flex justify-end items-end py-[20px]">
                        <Button
                            variant="destructive"
                            type="submit"
                            size="sm"
                        >
                            <p className=' font-normal text-xs'>Save Change</p>
                        </Button>
                    </div> */}

                </form>
            </Form >
        </>
    )
}
