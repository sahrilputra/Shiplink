import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'
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


    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const handleSave = (formData) => {
        console.log("🚀 ~ handleSave ~ formData:", formData)
        setLoading(true)
        try {
            formData.action = 'add';
            const response = axios.post(
                `/api/customerAPI/payments/addCard`,
                formData
            )
            console.log("🚀 ~ handleSave ~ response:", response)
            setLoading(false)
            toast({
                title: "Success",
                description: `${response.data.message}`,
                status: "success",
            })
        } catch (error) {
            setLoading(false)
            toast({
                title: "Failed",
                description: "Failed to Saved new Credit Card",
                status: "error",
            })
        }
    }

    const onError = (error) => {
        console.log("error", error)
    }

    console.log("Forms Watch", form.watch())

    console.log("Form Error", form.formState.errors)
    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className=''
                    onSubmit={form.handleSubmit(handleSave, onError)}
                    action="">
                    <div className="profile flex flex-col gap-2 w-full">
                        <FormField
                            className="w-full"
                            name="cardType"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Select Card</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            name="cardHolderName"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Full Name On Card</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="cardHolderName"  {...field} />
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
                    <div className="address flex flex-row w-full gap-4 py-2">
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
                    <div className=" flex justify-end items-end text-sm mt-4">
                        <Button
                            variant="destructive"
                            type="submit"
                            size="sm"
                        >
                            <p className=' font-normal text-xs '>Save</p>
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
