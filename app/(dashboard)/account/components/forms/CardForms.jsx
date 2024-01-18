import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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
    cardType: yup.string().required(),
    cardNumber: yup.string().required(),
    cardHolderName: yup.string().required(),
    expiryDate: yup.string().required(),
    cvv: yup.string().required(),

})



export const CardForms = () => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            cardType: "",
            cardNumber: "",
            cardHolderName: "",
            expiryDate: "",
            cvv: "",
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
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Select Card</FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-[100%]">
                                                    <SelectValue placeholder="Select Card Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Visa">Visa</SelectItem>
                                                    <SelectItem value="MasterCard">MasterCard</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="cardNumber"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl>
                                            <Input type="number" id="cardNumber" placeholder="123213 xxx " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="address flex flex-row w-full gap-4">
                        <FormField
                            name="expiryDate"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Valid Through</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="valid" placeholder="04/23"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="cvv"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>CVV Code</FormLabel>
                                        <FormControl >
                                            <Input type="number" id="cvv" placeholder="2123"  {...field} />
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
                            <p className=' font-normal '>Save</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
