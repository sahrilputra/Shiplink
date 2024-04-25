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
import { signIn, useSession, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import styles from './styles.module.scss'
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
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean(),
})



export default function Home() {

    const { toast } = useToast();
    const { data: session, status } = useSession();
    console.log('Session:', session);
    console.log('status:', status);
    const router = useRouter();
    const [loading, setLoading] = useState(false)
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
            await axios.post(
                '/api/admin/getToken',
                {
                    username: form.watch('username'),
                    password: form.watch('password')
                },
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                setLoading(false)
                const responseMessage = response.data.message;
                console.log("🚀 ~ ).then ~ responseMessage:", responseMessage)
                try {
                    if (responseMessage === "success") {
                        const token = response.data.token
                        console.log("🚀 ~ ).then ~ token:", token)
                        const { users } = response.data
                        const { permission } = response.data
                        const id = users.user_id
                        const user = permission.user
                        const code = users.user_code
                        const email = users.email
                        const password = users.password
                        const type = users.type
                        const role = users.role
                        const role_id = users.role_id
                        const warehouse_id = users.warehouse_id
                        const name = permission.user.name
                        const warehouse_name = users.warehouse_name
                        const img = users.profile_picture
                        signIn('credentials', {
                            id: id,
                            token: token,
                            code: code,
                            email: email,
                            password: password,
                            type: type,
                            role: role,
                            role_id: role_id,
                            warehouse_id: warehouse_id,
                            warehouse_name: warehouse_name,
                            img: img,
                            name: name,
                            redirect: true,
                            callbackUrl: '/admin/package-details'
                        });

                        toast({
                            title: 'Login Success',
                            description: 'Redirecting to Admin Dashboard',
                            type: 'success',
                        })
                        router.push('/admin/package-details');
                    }
                    if (responseMessage === "Unverified") {
                        console.log("UNVERIFID EMAIL")
                        toast({
                            title: 'Redirecting to verify your email',
                            description: 'Redirecting to verify your email',
                            type: 'error',
                        })
                        router.push('/auth/verification');
                    }
                    if (responseMessage === "Incorrect") {
                        console.log("🚀 ~ ).then ~ Incorrect username and password:")
                        toast({
                            title: 'Login Failed',
                            description: 'Invalid Email/Username or Password',
                            type: 'error',
                        })
                    }
                } catch (error) {
                    console.log("Error", error)
                }
            })

        } catch (error) {
            setLoading(false)
            console.log('Error:', error);
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {

    //         if (responseMessage === "Unverified") {
    //             console.log("UNVERIFID EMAIL")
    //             toast({
    //                 title: 'Redirecting to verify your email',
    //                 description: 'Redirecting to verify your email',
    //                 type: 'error',
    //             })
    //             router.push('/auth/verification');
    //         }
    //         if (responseMessage === "Incorrect") {
    //             console.log("🚀 ~ ).then ~ Incorrect username and password:")
    //             setIsError(true)
    //             toast({
    //                 title: 'Login Failed',
    //                 description: 'Invalid Email/Username or Password',
    //                 type: 'error',
    //             })
    //         }
    //     } catch (error) {
    //         setLoading(false)
    //         console.log('Error:', error);
    //     }
    // }

    useEffect(() => {
        if (session) {
            router.push('/admin/arrival-scan');
        }
    }, [session, router])
    return (
        <>
            {loading && <Loaders />}
            <div className={`${styles.main} flex flex-col text-center justify-center pb-[30px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE]`}>
                <div className="py-6 px-10 bg-white rounded-md  border shadow-md relative z-10 w-[90%]  md:w-[540px] ">
                    <div className="flex flex-col gap-2 py-3">
                        <div className="text-zinc-600 text-sm font-bold">Admin Log In</div>
                        <div className="text-myBlue text-2xl font-bold">Hello Admin!</div>
                    </div>
                    <Form {...form}>
                        <form
                            className='gap-4  flex flex-col'
                            action=""
                            onSubmit={handleSubmit}
                        >
                            <FormField
                                className="w-full"
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-xs text-neutral-900 flex flex-col text-left">
                                            <FormLabel className="text-sm">Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full text-sm"
                                                    type='text'
                                                    placeholder="Username"
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
                                                    className="h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full text-sm"
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

                            <div className="flex flex-col gap-3 justify-between items-center flex-wrap py-2 px-1 md:flex-row">
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
                                                            id="remember" className="w-[15px] h-[15px]" />
                                                    </FormControl>
                                                    <FormLabel className="text-sm">Remember me</FormLabel>
                                                </FormItem>

                                            </>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <Link passHref href={'/admin-login/reset_password'}>
                                        <p className="text-sm text-red-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Forget password?
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full py-3 flex flex-col gap-2">
                                <Button
                                    variant="destructive"
                                    type="sumbit"
                                    size="sm"
                                    className="w-full">
                                    <p className="text-xs">Login</p>
                                </Button>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Link passHref href={'/auth/login'}>
                                    <p className="text-sm text-myBlue text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Not an Admin? Login as User
                                    </p>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>


        </>
    )
}