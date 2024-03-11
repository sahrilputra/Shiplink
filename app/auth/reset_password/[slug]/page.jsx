'use client'
import React, { useEffect, useState } from "react";
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
            if (response.status === 200) {
                console.log(response)
                setLoading(false)
                setVerificationStatus(response.data.message)
                // router.push('/auth/login')
            } else {
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
            <div className="flex flex-col text-center pt-[90px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE] ">
                <div className="flex flex-col gap-5 py-10">
                    {/* <div className="text-myBlue text-lg font-bold">Reset Your Password</div> */}
                    <div className="text-myBlue text-3xl font-bold">Reset Your Password</div>
                </div>
                <div className="p-10 bg-white rounded-md  border shadow-md gap-8  flex flex-col sm:w-max md:w-[640px]">
                    <div className="text-myBlue text-lg font-bold">{errorHeader}</div>
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
                            <div className="w-full py-2">
                                <Button
                                    variant="secondary"
                                    type="submit"
                                    className="w-full">
                                    <p className="text-base">Sent</p>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}

