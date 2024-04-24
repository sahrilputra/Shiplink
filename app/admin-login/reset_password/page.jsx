'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect, useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { Loaders } from "@/components/ui/loaders";
import { useForm } from 'react-hook-form'
import axios from "axios";
import styles from '../styles.module.scss'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast";

const formSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
})

export default function Home() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [messageStatus, setMessageStatus] = useState("")
    const { toast } = useToast();

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router])

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    })

    const onSubmit = async (formData) => {
        console.log("🚀 ~ onSubmit ~ formData:", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                '/api/customerAPI/resetPassword',
                {
                    email: form.watch('email'),
                    redirect: 'https://slc.webelectron.com/admin-login/reset_password'
                }
            )
            setLoading(false)
            console.log("🚀 ~ response", response)
            if (response.data.status === true) {
                setMessageStatus("Email Sended! Please Check Your Email")
                toast({
                    title: 'Email Sended! Please Check Your Email',
                    description: response.data.message,
                    status: 'success',
                });
            } else {
                setMessageStatus("Error! " + response.data.message)
                toast({
                    title: 'Error!',
                    description: response.data.message,
                    status: 'error',
                });
            }
        } catch (error) {
            setLoading(false)
            console.log("🚀 ~ error", error)
        }
    }

    return (
        <>
            {
                loading && <Loaders />
            }
            <div className={`${styles.main} flex flex-col text-center justify-center pb-[30px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE]`}>
                <div className="py-6 px-10 bg-white rounded-md  border shadow-md relative z-10 w-[90%]  md:w-[540px] ">
                    <div className="flex flex-col gap-2 py-3  w-[90%] items-center justify-center mx-auto">
                        <div className=" text-zinc-600 text-sm font-bold">Forgot Password?</div>
                        <div className=" text-myBlue text-lg font-bold leading-5">Please enter your email to get the activation code </div>
                    </div>

                    <div className="text-red-600 text-lg font-bold">{messageStatus}</div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='gap-4  flex flex-col'
                            action=""
                        >
                            <FormField
                                className="w-full"
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 flex flex-col text-left">
                                            <FormLabel className="text-sm">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-sm h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    type='email'
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <div className="w-full flex flex-row gap-4 py-2">
                                <Button
                                    variant="redOutline"
                                    className="text-xs w-full"
                                    size="sm"
                                    type="button"
                                    onClick={() => router.push('/admin-login')}
                                >
                                    <p className="text-xs">Back</p>
                                </Button>

                                <Button
                                    variant="destructive"
                                    type="submit"
                                    className="text-xs w-full"
                                    size="sm"
                                >
                                    <p className="text-xs">Sent</p>
                                </Button>


                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}