import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = yup.object().shape({
    FullName: yup.string().required(),
    Plans: yup.string().required(),
    Country: yup.string().required(),
    Emails: yup.string().required(),
    Password: yup.string().required(),
})



export const NewCustomerForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            FullName: "",
            Plans: "",
            Country: "",
            Emails: "",
            Password: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className=''
                    action="">
                    <div className="flex flex-col gap-2 text-xs">
                        <FormField
                            className="w-full"
                            name="FullName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Customer Full Name</FormLabel>
                                        <FormControl>
                                            <Input id="FullName" placeholder="Full Name" className="text-sm bg-slate-100" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Plans"
                            render={({ field }) => (
                                <FormItem className="w-full text-neutral-900 space-y-1">
                                    <FormLabel className="text-sm">Customer Full Name</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-row gap-2 justify-around space-y-1 items-end"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                <FormControl>
                                                    <RadioGroupItem value="Free" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Free
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                <FormControl>
                                                    <RadioGroupItem value="Business" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Business
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                <FormControl>
                                                    <RadioGroupItem value="Personal" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Personal</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="Country"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm"  >Country</FormLabel>
                                        <FormControl >
                                            <Input id="Country" className="text-sm bg-slate-100"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            name="Password"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm"  >Password</FormLabel>
                                        <FormControl >
                                            <Input type="Password" id="Password" className="text-sm bg-slate-100"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className=" flex flex-row justify-between gap-2 py-5 ">
                        <Button
                            variant="redOutline"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault()
                                close()
                            }}
                        >
                            <p className=' font-normal text-xs'>Cancel</p>
                        </Button>
                        <Button
                            variant="destructive"

                            size="sm"
                            className="w-full"
                            onClick={() => {
                                toast({
                                    title: "Saved New Sequence!",
                                    description: "Friday, February 10, 2023 at 5:57 PM",
                                })
                            }}
                        >
                            <p className=' font-normal text-xs'>Save</p>
                        </Button>
                    </div>


                </form>
            </Form >
        </>
    )
}
