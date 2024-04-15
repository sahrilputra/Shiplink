'use client'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, Form, FormLabel } from '@/components/ui/form'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = yup.object().shape({
    Time_zone: yup.string().required(),
    Date_format: yup.string().required(),
    Time_format: yup.string().required(),
})

const DateFormatList = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
    { value: "YYYY/MM/DD", label: "YYYY/MM/DD" },
]

const TimeFormatList = [
    { value: "12 Hours", label: "12 Hours" },
    { value: "24 Hours", label: "24 Hours" },
]

export const DateForm = () => {

    const [loading, setLoading] = useState(false)
    const { toast } = useToast();

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            publishableKey: "",
            secretKey: "",
        },
        mode: "onChange",
    })


    const handleCancel = () => {
        form.reset();
    }

    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className=''
                    action="">
                    <div className="flex flex-col gap-2 w-full mt-2 px-2">
                        <div className="flex flex-row gap-3 w-full px-3">
                            <FormField
                                control={form.control}
                                name="Date_format"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel>Date Format</FormLabel>
                                        <Select
                                            className="w-[150px] text-xs"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-[35px] w-[150px] rounded text-xs  p-1">
                                                    <SelectValue className='text-xs ' placeholder="Select Format" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup >
                                                    {
                                                        DateFormatList.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <SelectItem
                                                                        className="text-xs"
                                                                        key={index}
                                                                        value={item.value}
                                                                    >
                                                                        {item.value}
                                                                    </SelectItem>
                                                                </>
                                                            );

                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Time_format"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel>Time Format</FormLabel>
                                        <Select
                                            className="w-[150px] text-xs"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-[35px] w-[150px] rounded text-xs  p-1">
                                                    <SelectValue className='text-xs' placeholder="Select Time Format" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup >
                                                    {
                                                        TimeFormatList.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <SelectItem
                                                                        className="w-[150px] text-xs"
                                                                        key={index}
                                                                        value={item.value}
                                                                    >
                                                                        {item.value}
                                                                    </SelectItem>
                                                                </>
                                                            );

                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-row w-full items-center justify-end gap-3">
                            <Button
                                variant="redOutline"
                                size="xs"
                                className="px-4 text-xs"
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                size="xs"
                                className="px-4 text-xs"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Form >
        </>
    )
}
