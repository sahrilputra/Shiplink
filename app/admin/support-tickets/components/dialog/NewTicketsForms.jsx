import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
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
    Subject: yup.string().required(),
    Message: yup.string().required(),
    File: yup.string().required(),
})



export const CreateNewTicketsForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            Subject: "",
            Message: "",
            File: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='w-full'
                    action="">

                    <div className=" w-full flex flex-col gap-2 text-xs">
                        <FormField
                            className="w-full"
                            name="Subject"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Subject</FormLabel>
                                        <FormControl>
                                            <Input id="Subject" placeholder="Subject" className="text-xs" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="Message"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm" >Message</FormLabel>
                                        <FormControl>
                                            <Textarea id="Message" className="text-xs"
                                                style={{ maxHeight: '200px' }} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            name="File"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Attach File</FormLabel>
                                        <FormControl>
                                            <div className='rounded-md border border-slate-200 p-0'>
                                                <Input
                                                    id="wholeBox"
                                                    type="file"
                                                    className="text-xs p-0 border-none h-9 py-0  file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs "
                                                    placeholder="Attach File"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className=" flex flex-row justify-between gap-2 py-5">
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
                                        title: "Created new tickets!",
                                        description: "Friday, February 10, 2023 at 5:57 PM",
                                    })
                                }}
                            >
                                <p className=' font-normal text-xs'>Save</p>
                            </Button>
                        </div>

                    </div>

                </form>
            </Form >
        </>
    )
}
