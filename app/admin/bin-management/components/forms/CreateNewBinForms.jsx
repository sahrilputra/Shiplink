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
    BinID: yup.string().required(),
    Row: yup.number().required(),
    Section: yup.number().required(),
    Level: yup.number().required(),
})



export const CreateNewBinForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            BinID: "",
            Row: "",
            Section: "",
            Level: ""
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
                            name="BinID"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Bin ID</FormLabel>
                                        <FormControl>
                                            <Input id="BinID" placeholder="#423432" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="flex flex-row justify-between gap-3">
                            <FormField
                                name="Row"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm"  >Row</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="Row" placeholder="0000001" className="text-sm"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="Section"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm"  >Section</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="Section" placeholder="0000001" className="text-sm"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="Level"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900">
                                            <FormLabel className="text-sm"  >Level</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="Level" placeholder="Level" className="text-sm"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className=" flex flex-row justify-between gap-2 ">
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

                    </div>

                </form>
            </Form >
        </>
    )
}
