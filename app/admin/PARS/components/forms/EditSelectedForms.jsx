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

const formSchema = yup.object().shape({
    SequenceID: yup.string(),
    Type: yup.string(),
    ItemID: yup.number(),
    EditDate: yup.string(),
    SequenceNumber: yup.string(),
})



export const EditSelectedNumberForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            SequenceID: "",
            Type: "",
            ItemID: "",
            EditDate: "",
            SequenceNumber: "",

        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-4 flex-col'
                    action="">

                    <div className="profile flex flex-col gap-2 w-full text-xs">
                        <FormField
                            className="w-full"
                            name="SequenceNumber"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Edit Selected Number</FormLabel>
                                        <FormControl>
                                            <Input id="SequenceNumber" placeholder="12312332" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className=" flex flex-row justify-between gap-2 ">
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="w-[200px]"
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
                                className="w-[200px]"
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

                    </div>

                </form>
            </Form >
        </>
    )
}
