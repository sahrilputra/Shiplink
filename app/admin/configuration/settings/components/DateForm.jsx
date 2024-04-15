'use client'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, Form, FormLabel } from '@/components/ui/form'
import axios from 'axios'
import { useTimeFormat } from '@/context/TimeFormatProvider'
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
    { value: "MMMM Do YYYY", label: "MMMM Do YYYY" },
]

const TimeFormatList = [
    { value: "HH:mm:ss", label: "HH:mm:ss" },
    { value: "HH:mm", label: "HH:mm" },
    { value: "HH:mm A", label: "HH:mm A" },
    { value: "HH:mm:ss A", label: "HH:mm:ss A" },
]

export const DateForm = () => {
    const { timeFormat, changeTimeFormat, changeDateFormat, dateFormat } = useTimeFormat();
    console.log("🚀 ~ DateForm ~ dateFormat:", dateFormat)
    console.log("🚀 ~ DateForm ~ timeFormat:", timeFormat)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            Date_format: dateFormat || "",
            Time_format: timeFormat || "",
        },
        mode: "onChange",
    })

    const handleCancel = () => {
        form.reset();
    }

    const handleSubmit = async () => {
        console.log("🚀 ~ handleSubmit ~ e:")
        setLoading(true)
        try {
            changeDateFormat(form.getValues('Date_format'))
            changeTimeFormat(form.getValues('Time_format'))
            setLoading(false)
            toast({
                title: "Success",
                description: "Data saved successfully",
                status: "success",
            });

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save data",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            setLoading(false)
        }
    }


    console.log("🚀 ~ DateForm ~ form:", form.watch('Date_format'), form.watch('Time_format'))

    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className=''
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
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
                                                                <SelectItem
                                                                    className="text-xs"
                                                                    key={index}
                                                                    value={item.value}
                                                                >
                                                                    {item.value}
                                                                </SelectItem>
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
                                                                <SelectItem
                                                                    className="w-[150px] text-xs"
                                                                    key={index}
                                                                    value={item.value}
                                                                >
                                                                    {item.value}
                                                                </SelectItem>
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
