import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
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
import { Loaders } from '@/components/ui/loaders'
import { DialogFooter, DialogClose } from '@/components/ui/dialog'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
const formSchema = yup.object().shape({
    cardType: yup.string().required(),
    cardNumber: yup.string().required(),
    cardHolderName: yup.string().required(),
    expiryDate: yup.string().required(),
    cvv: yup.string().required(),

})


export const NewPaymentsCard = () => {

    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
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

    const handleSave = (formData) => {
        console.log("formData", formData);
        setLoading(true);
        try {
            axios.post('/api/customerAPI/payments/addCard', formData)
                .then((response) => {
                    setLoading(false);
                    console.log("response", response);
                    toast({
                        variant: "success",
                        title: "Payment Confirmed",
                        description: "Payment has been processed",
                    })
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("error", error);
                    toast({
                        variant: "destructive",
                        title: "Payment Canceled",
                        description: "Try again",
                    })
                })
        } catch (error) {
            console.error("error", error);
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className="w-full flex flex-col">
                <Form {...form}>
                    <form
                        className='flex gap-4 flex-col w-full '
                        action=""
                        onSubmit={form.handleSubmit(handleSave, (errors) => console.log(errors))}
                    >

                        <div className="profile flex flex-col gap-4 w-full">
                            <FormField
                                name="cardHolderName"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Name On Card</FormLabel>
                                            <FormControl>
                                                <Input type="text" id="cardHolderName" placeholder="John Doe " {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormLabel>Card Number</FormLabel>
                            <div className=" flex flex-row gap-3 w-[100%]">
                                <FormField
                                    className="w-[20%]"
                                    name="cardType"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full">
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
                                    name="cardNumber"
                                    className="w-[80%]"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full">
                                                {/* <FormLabel>Card Number</FormLabel> */}
                                                <FormControl>
                                                    <Input type="number" id="cardNumber" placeholder="123213 xxx " {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>


                            <div className="flex flex-row gap-3 w-full">
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
                        </div>

                        <div className="flex flex-col">

                            <div className="inline-flex gap-[10px]">
                                <input
                                    id='saved_checkbox'
                                    type="checkbox"
                                    placeholder='Save this card'
                                />
                                <p>Save this Cards ?</p>
                            </div>
                        </div>

                        <div className="flex-col w-full  justify-start items-start gap-[15px] flex">
                            <div className="flex-col w-full justify-start items-start gap-2.5 flex">
                                <div className="w-full justify-between items-start inline-flex">
                                    <div className="text-neutral-900 text-base font-normal font-['Poppins']">Sub Total</div>
                                    <div className=" text-right text-neutral-900 text-base font-normal font-['Poppins']">$25.00</div>
                                </div>
                                <div className=" w-full justify-between items-start inline-flex">
                                    <div className="text-neutral-900 text-base font-normal font-['Poppins']">Tax</div>
                                    <div className=" text-right text-neutral-900 text-base font-normal font-['Poppins']">$5.00</div>
                                </div>
                            </div>
                            <div className="w-[100%]">
                                <Separator className="py-[1px]" />
                            </div>
                            <div className="w-full  justify-between items-start inline-flex">
                                <div className="text-neutral-900 text-base font-semibold font-['Poppins']">Total</div>
                                <div className=" text-right text-neutral-900 text-base font-semibold font-['Poppins']">$30.00</div>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className=" flex justify-between w-full items-center ">
                                <DialogClose asChild>
                                    <Button
                                        variant="redOutline"
                                        type="button"
                                    >
                                        <p className=' font-normal '>Cancel</p>
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                    >
                                        <p className=' font-normal '>Process</p>
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </form>
                </Form >
            </div>
        </>
    )
}
