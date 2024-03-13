'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { Loaders } from "@/components/ui/loaders";
import { MailOpen } from "lucide-react";
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import { useToast } from '@/components/ui/use-toast'
const formSchema = yup.object().shape({
    username: yup.string().required('Email/Username is required'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean(),
})
export default function Home() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()
    const searchParams = useSearchParams()
    const myParam = searchParams.get('email')
    console.log("🚀 ~ Home ~ myParam:", myParam)

    const router = useRouter();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router])


    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(
                `/api/customerAPI/resendVerification`,
                {
                    email: myParam,
                }
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response.status)
                setLoading(false)
                setOpen(false)
                setLoading(false)
                if (response.data.status === false || response.data.status === 'false') {
                    toast({
                        title: 'Error!',
                        description: response.data.message,
                        status: 'error',
                    });
                    return;
                } else {
                    toast({
                        title: 'Email Sent! Please Check Your Email',
                        description: response.data.message,
                        status: 'success',
                    });
                }
            })
        } catch (error) {
            setLoading(false)
            console.log('Error:', error);
            toast({
                title: 'internal server error!',
                description: error.message,
                status: 'success',
            });
        }
    }
    return (
        <>
            {
                loading && <Loaders />
            }
            {/* <EmailDiallog open={open} setOpen={setOpen} /> */}
            <div className="flex flex-col text-center pt-[90px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE] ">
                <div className="flex flex-col gap-5 py-10">
                    <div className="text-myBlue text-lg font-bold">Please Check Your Email</div>
                    <div className="text-zinc-600 text-3xl font-bold">Confirmation Your Email</div>
                </div>
                <div className="p-10 bg-white rounded-md  border shadow-md gap-8  flex flex-col sm:w-max md:w-[640px]">
                    <div className="w-full flex justify-center flex-col items-center">
                        <div className="">
                            <MailOpen width={100} height={100} className="text-myBlue" />
                        </div>
                        <div className="py-5">
                            <p className="text-myBlue font-semibold text-3xl py-2">We just sent your email</p>
                            <p>Please Follow the link in your email to confimation your email</p>
                        </div>
                        <div className="py-3">
                            <p>Didnt get email yet ? <div onClick={() => handleSubmit()} className="text-red-600 cursor-pointer">Resend Email</div></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}