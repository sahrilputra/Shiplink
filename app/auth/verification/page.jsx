'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { Loaders } from "@/components/ui/loaders";
import { MailOpen } from "lucide-react";
import { EmailDiallog } from "./components/EmailDialog";
const formSchema = yup.object().shape({
    username: yup.string().required('Email/Username is required'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean(),
})
export default function Home() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [open, setOpen] = useState(false)

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
            <EmailDiallog open={open} setOpen={setOpen} />
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
                            <p>Didnt get email yet ? <div onClick={() => setOpen(true)} className="text-red-600 cursor-pointer">Resend Email</div></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}