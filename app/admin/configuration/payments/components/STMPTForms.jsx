'use client'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form'
import axios from 'axios'
import { Loaders } from '@/components/ui/loaders'
import { useToast } from '@/components/ui/use-toast'
const formSchema = yup.object().shape({

    server: yup.string().required(),
    senderName: yup.string().required(),
    emailSender: yup.string().required(),
    port: yup.number().required(),
    username: yup.string().required(),
    password: yup.string().required(),

})

export const STMPTForms = () => {

    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        server: "",
        senderName: "",
        emailSender: "",
        port: 0,
        username: "",
        password: ""
    })
    console.log("🚀 ~ STMPTForms ~ data:", data)

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            server: "",
            senderName: "",
            emailSender: "",
            port: 0,
            username: "",
            password: ""
        },
        mode: "onChange",
    })

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(
                    `/api/admin/config/SMPT/getData`
                )
                console.log("🚀 ~ fetchData ~ STMPTForms:", response)
                const responseData = response.data.data
                setData({
                    server: responseData.server,
                    senderName: responseData.senderName,
                    emailSender: responseData.emailSender,
                    port: responseData.port,
                    username: responseData.username,
                    password: responseData.password
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        form.setValue("server", data?.server || "")
        form.setValue("senderName", data?.senderName || "")
        form.setValue("emailSender", data?.emailSender || "")
        form.setValue("port", data?.port || "")
        form.setValue("username", data?.username || "")
        form.setValue("password", data?.password || "")
    }, [data])

    const { handleSubmit, formState, register, setError, setValue } = form
    const { errors } = formState


    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data", data)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/config/SMPT/setData`,
                {
                    server: data.server,
                    senderName: data.senderName,
                    emailSender: data.emailSender,
                    port: data.port,
                    username: data.username,
                    password: data.password
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
        } catch (error) {
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
                                name="server"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Server</div>
                                                    <Input
                                                        placeholder="Enter Server"
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
                                name="senderName"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Sender Name</div>
                                                    <Input
                                                        placeholder="Enter your Sender Name"
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
                                name="emailSender"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Email Sender</div>
                                                    <Input
                                                        placeholder="Enter your Email Sender"
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
                                name="port"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Port</div>
                                                    <Input
                                                        placeholder="Enter your port"
                                                        className="rounded-l-none"
                                                        size="xs"
                                                        type="number"
                                                        min="0"
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
                                name="username"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Username</div>
                                                    <Input
                                                        placeholder="Enter your username"
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
                                name="password"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl >
                                            <>
                                                <div className="flex flex-row w-full items-center">
                                                    <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Password</div>
                                                    <Input
                                                        placeholder="Enter your password"
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
                                type="button"
                                onClick={() => form.reset()}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                size="xs"
                                className="px-4 text-xs"
                                type="submit"
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
