import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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

const formSchema = yup.object().shape({
    LotsId: yup.string().required().max(50, "character is too long"),
    LotsLabel: yup.string().required(),
    Origin: yup.string().required(),
    Destination: yup.string().required(),
    PickupDate: yup.date().required(),
})



export const NewLotsFrom = ({ close, data = null }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            LotsId: data?.LotsId || "",
            LotsLabel: data?.LotsLabel || "",
            Origin: data?.Origin || "",
            Destination: data?.Destination || "",
            PickupDate: data?.PickupDate || "",
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
                            name="LotsId"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Lots ID</FormLabel>
                                        <FormControl>
                                            <Input id="LotsId" placeholder="1231" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="LotsLabel"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Lots Labels</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="LotsLabel" placeholder="Regular Daily Move"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="Origin"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Origin</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="Origin" placeholder="Select Origin" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="Destination"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Destination</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="Destination" placeholder="Input Destination" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />

                        </div>
                        <FormField
                            name="PickupDate"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Pickup Schedule</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="PickupDate" placeholder="Select Origin" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                    </div>

                </form>
            </Form >
        </>
    )
}
