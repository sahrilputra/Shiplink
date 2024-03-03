'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Loaders } from "@/components/ui/loaders";
const formSchema = yup.object().shape({
    username: yup.string().required('Email/Username is required'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean(),
})
export default function Home() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            remember: false
        },
        mode: "onChange",
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signIn('credentials', {
                username: form.watch('username'),
                password: form.watch('password'),
            });
            console.log('Login success');
            router.push('/dashboard')
            setLoading(false);
        } catch (error) {
            setLoading(false)
            console.log('Error:', error);
        }
    }
    const [inputEmail, setInputEmail] = useState('')

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router])
    return (
        <>
            {
                loading && <Loaders />
            }
            <div className="flex flex-col text-center pt-[90px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE] ">
                <div className="flex flex-col gap-5 py-10">
                    <div className="text-myBlue text-lg font-bold">Welcome Back</div>
                    <div className="text-zinc-600 text-3xl font-bold">Log In to start saving!</div>
                </div>
                <div className="p-10 bg-white rounded-md  border shadow-md gap-8  flex flex-col sm:w-max md:w-[640px]">
                    <Form {...form}>
                        <form
                            className='gap-8  flex flex-col'
                            action=""
                            onSubmit={handleSubmit}
                        >
                            <FormField
                                className="w-full"
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 flex flex-col text-left">
                                            <FormLabel className="text-sm">Email/Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    type='text'
                                                    placeholder="Email/Username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className="w-full"
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 flex flex-col text-left">
                                            <FormLabel className="text-sm">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    type='password'
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <div className="flex flex-row justify-between items-center py-2 px-1">
                                <div className="flex flex-row gap-2 ">
                                    <FormField
                                        className="w-full flex flex-row items-center py-2 px-1"
                                        name="remember"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-neutral-900 flex flex-row text-left items-center gap-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            id="remember" className="w-[20px] h-[20px]" />
                                                    </FormControl>
                                                    <FormLabel className="text-sm">Remember me</FormLabel>
                                                </FormItem>

                                            </>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-base text-red-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Forget password?
                                    </p>

                                </div>
                            </div>
                            <div className="w-full py-3">
                                <Button
                                    variant="secondary"
                                    type="submit"
                                    className="w-full">
                                    <p className="text-base">Login</p>
                                </Button>
                            </div>
                        </form>
                    </Form>

                </div>
            </div>
        </>
    )
}