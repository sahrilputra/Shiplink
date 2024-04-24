'use client'
import React, { use, useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import https from "https";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useToast } from "@/components/ui/use-toast";
import styles from '../../styles.module.scss'
import { Loaders } from "@/components/ui/loaders";

const agent = new https.Agent({
    rejectUnauthorized: false
});
const formSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
})
export default function ResetPassword({ params }) {
    const data = params.slug;
    const { toast } = useToast();
    console.log("🚀 ~ ResetPassword ~ data:", data)
    const router = useRouter();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    })
    const [verificationStatus, setVerificationStatus] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorHeader, setErrorHeader] = useState("")

    const handleSave = async (formDatta) => {
        console.log(formDatta)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/customerAPI/passwordVerification`,
                {
                    password: formDatta.password,
                    reset_token: data
                },
            )
            console.log("Response from API", response)
            if (response.data.status === true) {
                toast({
                    description: response.data.message,
                    status: "success",
                })
                console.log(response)
                setLoading(false)
                setVerificationStatus(response.data.message)
                // router.push('/auth/login')
            } else {
                toast({
                    description: response.data.message,
                    status: "Erorr",
                })
                console.log(error)
                setLoading(false)
                setErrorHeader("Error Occoured, Please Try Again Later", error)
                setError(error.response.data.message)
            }
        } catch (error) {
            setLoading(false)
            console.log("🚀 ~ handleSave ~ error:", error)
            setErrorHeader("Error Occoured, Please Try Again Later", error)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className={`${styles.main} flex flex-col text-center justify-center pb-[30px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE]`}>
                <div className="py-6 px-10 bg-white rounded-md  border shadow-md relative z-10 w-[90%]  md:w-[540px] ">

                    <div className="flex flex-col gap-1 py-3">
                        <div className="text-myBlue text-lg font-bold">Reset Your Password</div>
                        <div className="text-red-600 text-sm font-bold">{errorHeader}</div>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSave)}
                            className='gap-4  flex flex-col'
                            action=""
                        >
                            <FormField
                                className="w-full"
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 flex flex-col text-left">
                                            <FormLabel className="text-sm">New Passowrd</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-sm h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    type='password'
                                                    autoComplete="off"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className="w-full"
                                name="confirmPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 flex flex-col text-left">
                                            <FormLabel className="text-sm">Confirmation Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-sm h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    type='password'
                                                    autoComplete="off"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />

                            <div className="w-full py-2">
                                <Button
                                    variant="destructive"
                                    type="submit"
                                    className="text-xs w-full"
                                    size="sm"
                                >
                                    <p className="text-xs">Change</p>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}

