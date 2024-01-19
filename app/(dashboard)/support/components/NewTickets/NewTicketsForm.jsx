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
import { Textarea } from '@/components/ui/textarea'

const formSchema = yup.object().shape({
    fullName: yup.string().required(),
    subject: yup.string().required(),
    area: yup.string().required(),
    message: yup.string().required(),
    file: yup.string(),
})



export const NewTicketsForm = ({ close }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: "",
            subject: "",
            area: "",
            message: "",
            file: "",
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
                            name="fullName"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="name" placeholder="Full Name " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="subject"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="subject" placeholder="Subject Here " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="area"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="area" placeholder="Area... " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="file"
                            className="w-full "
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="flex flex-col gap-4 ">
                                        <FormLabel>Upload File</FormLabel>
                                        <FormControl>
                                            <Button
                                                variant="destructive"
                                                type="file"
                                            >
                                                <p className='text-sm'>Attach File</p>
                                            </Button>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="message"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className=" flex justify-end items-center gap-5 ">
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
                            <p className=' font-normal '>submit</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
