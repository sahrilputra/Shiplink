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
    SCAC: yup.string().required(),
    CodeStart: yup.string().required(),
    CodeRange: yup.number().required(),
})



export const PARSForms = ({ close, data = null }) => {

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

                    <div className="profile flex flex-row gap-4 w-full items-end text-xs">
                        <FormField
                            className="w-full"
                            name="SCAC"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
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
                            className="w-[40%]"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[40%]">
                                        <FormLabel  className="text-sm"  >Code Start #</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="CodeStart" placeholder="0000001"  className="text-sm"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="CodeRange"
                            className="w-[30%]"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[30%]">
                                        <FormLabel  className="text-sm" >Code Range</FormLabel>
                                        <FormControl >
                                            <Input type="number" id="CodeStart" placeholder="100"  className="text-sm"   {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <Button
                            variant="destructive"
                            type="submit"
                            size="sm"
                            className="w-[200px]"
                        >
                            <p className=' font-normal text-xs'>Register</p>
                        </Button>

                    </div>

                </form>
            </Form >
        </>
    )
}
