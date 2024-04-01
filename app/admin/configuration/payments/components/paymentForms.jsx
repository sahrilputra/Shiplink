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
    publishableKey: yup.string().required(),
    secretKey: yup.string().required(),
})
export const PaymentForms = () => {

    const [loading, setLoading] = useState(false)
    const { toast } = useToast();
    const [data, setData] = useState({
        publishableKey: "",
        secretKey: "",
    })


    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            publishableKey: data?.publishableKey || "",
            secretKey: data?.secretKey || "",
        },
        mode: "onChange",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/admin/config/payments/getData`
                )
                console.log("🚀 ~ fetchData ~ response:", response)
                const responseData = response.data
                setData({
                    publishableKey: responseData.data.publishableKey,
                    secretKey: responseData.data.secretKey,
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {

        form.setValue("publishableKey", data?.publishableKey || "")
        form.setValue("secretKey", data?.secretKey || "")

    }, [data])

    const { handleSubmit, formState, register, setError, setValue } = form
    const { errors } = formState
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/config/payments/setData`,
                {
                    secretKey: data.secretKey,
                    publishableKey: data.publishableKey,
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
                                name="publishableKey"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Publishable key</div>
                                                    <Input
                                                        placeholder="Enter your publishable key"
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
                        <div className="flex flex-row w-full items-center">
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
                        </div>

                        <div className="flex flex-row w-full items-center justify-end gap-3">
                            <Button
                                variant="redOutline"
                                size="xs"
                                className="px-4 text-xs"
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
