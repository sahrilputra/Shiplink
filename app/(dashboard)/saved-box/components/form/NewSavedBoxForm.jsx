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
    boxName: yup.string().required().max(40, "character is too long"),
    boxWidth: yup.number().required(),
    boxLength: yup.number().required(),
    boxHeight: yup.number().required(),
    boxHeightType: yup.string().required(),
    boxWeight: yup.number().required(),
    boxWeightType: yup.string().email().required(),
  
})



export const NewSavedBox = ({ close, data = null }) => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            boxName: data?.boxName || "",
            boxWidth: data?.boxWidth || "",
            boxLength: data?.boxLength || "",
            boxHeight: data?.boxHeight || "",
            boxHeightType: data?.boxHeightType || "",
            boxWeight: data?.boxWeight || "",
            boxWeightType: data?.boxWeightType || "",
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
                            name="boxName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Box Name</FormLabel>
                                        <FormControl>
                                            <Input id="fullName" placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                    </div>
                    <div className="address flex flex-col w-full gap-4">
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="boxWidth"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Box Width</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="width" placeholder="0" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="boxLength"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Length</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="length" placeholder="0"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="wrap flex flex-row items-end justify-start gap-4">
                            <FormField
                                name="boxHeight"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Height</FormLabel>
                                            <FormControl >
                                                <Input type="number" id="boxHeight" placeholder="0" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="boxHeightType"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormControl >
                                                <Input type="text" id="state" placeholder="in"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="wrap flex flex-row items-end gap-4 justify-start">
                            <FormField
                                name="boxWeight"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Package Weight</FormLabel>
                                            <FormControl>
                                                <Input type="number" id="boxWeight" placeholder="0" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="boxWeightType"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                      <FormLabel></FormLabel>
                                        <FormItem className="w-full">
                                            <FormControl >
                                                <Input type="boxWeightType" id="boxWeightType" placeholder="ibs" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>

                        <div className=" flex justify-between items-end mt-[20px]">
                            <Button
                                variant="redOutline"
                                onClick={close}
                            >
                                <p className=' font-normal '>Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={close}

                            >
                                <p className=' font-normal '>Save</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
