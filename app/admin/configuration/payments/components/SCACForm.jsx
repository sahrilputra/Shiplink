'use client'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'


const formSchema = yup.object().shape({
    SCAC: yup.string().required(),
})
export const SCACForm = () => {

    const [loading, setLoading] = useState(false)
    const { toast } = useToast();
    const [data, setData] = useState({
        SCAC: "",
    })


    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            SCAC: "",
        },
        mode: "onChange",
    })


    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/admin/config/SCAC/getData`
            )
            console.log("🚀 ~ fetchData ~ SCAC response:", response)
            const responseData = response.data
            setData({
                SCAC: responseData.data.scac_code,
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        form.setValue("SCAC", data?.SCAC || "")
    }, [data])
    const handleCancel = () => {
        form.reset();
        fetchData();
    }

    const { handleSubmit, formState, register, setError, setValue } = form
    const { errors } = formState
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/config/SCAC/setData`,
                {
                    SCAC: form.watch("SCAC"),
                }
            )
            if (response.data.status === true || response.data.status === "true") {
                toast({
                    description: response.data.message,
                    type: "success",
                })
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    type: "error",
                })
            }
            setLoading(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=''
                    action="">
                    <div className="flex flex-col gap-2 w-full mt-2 px-3">
                        <div className="flex flex-row w-full items-center">
                            <FormField
                                name="SCAC"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">SCAC Code</div>
                                                    <Input
                                                        placeholder="Enter your SCAC Code"
                                                        className="rounded-l-none"
                                                        size="xs"
                                                        {...field}
                                                    />
                                                </div>

                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* <div className="flex flex-row w-full items-center">
                            <FormField
                                name="secretKey"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Secret key</div>
                                                    <Input
                                                        placeholder="Enter your Secret key"
                                                        className="rounded-l-none"
                                                        size="xs"
                                                        {...field}
                                                    />
                                                </div>

                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div> */}

                        <div className="flex flex-row w-full items-center justify-end gap-3">
                            <Button
                                variant="redOutline"
                                size="xs"
                                className="px-4 text-xs"
                                type="button"
                                onClick={
                                    handleCancel
                                }
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
