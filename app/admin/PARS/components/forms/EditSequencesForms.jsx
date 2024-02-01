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
    SCAC: yup.string().required(),
    CodeStart: yup.string().required(),
    CodeRange: yup.number().required(),
})



export const EditSequencesForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            SCAC: "",
            CodeStart: "",
            CodeRange: "",

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
                            name="SCAC"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">SCAC Carrier Code</FormLabel>
                                        <FormControl>
                                            <Input id="SCAC" placeholder="AC 12312" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="CodeStart"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm"  >Code Start #</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="CodeStart" placeholder="0000001" className="text-sm"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="CodeRange"
                            className="w-full "
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm" >Code Range</FormLabel>
                                        <FormControl >
                                            <Input type="number" id="CodeStart" placeholder="100" className="text-sm"   {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className="py-4">
                            <div className=" w-full px-11 py-[9px] bg-gray-50 rounded border border-gray-200 flex-col justify-center items-center inline-flex">
                                <div className="text-neutral-900 text-sm font-normal ">20230100 - 20230200</div>
                            </div>
                        </div>

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
