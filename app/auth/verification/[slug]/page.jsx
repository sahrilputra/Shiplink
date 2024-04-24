'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import https from "https";
const agent = new https.Agent({
    rejectUnauthorized: false
});
export default function Verification({ params }) {
    const data = params.slug;
    
    const router = useRouter();
    const [verificationStatus, setVerificationStatus] = useState('');
    const [error, setError] = useState('');
    const [showDirect, setShowDirect] = useState(false);
    const [errorHeader, setErrorHeader] = useState("")
    useEffect(() => {
        try {
            axios.post(
                `/api/customerAPI/verificationCode`,
                {
                    code: data
                }
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                showDirect(true)
                if (response.data.status === true) {
                    router.push('/login');
                }
                setVerificationStatus(response.data.message);
            }).catch((error) => {
                console.log("Error", error)
                setErrorHeader("Whoops!")
                setError('Invalid Verification Code');
            }
            )
        } catch (error) {
            console.log("Error", error)
            setError('Invalid Verification Code');
        }
    }, [params, data]);
    return (
        <>
            <div className="flex flex-col text-center pt-[90px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE] ">
                <div className="flex flex-col gap-5 py-10">
                    <div className="text-myBlue text-lg font-bold">Verify Code</div>
                    <div className="text-zinc-600 text-3xl font-bold"></div>
                </div>
                <div className="p-10 bg-white rounded-md  border shadow-md gap-8  flex flex-col sm:w-max md:w-[640px]">
                    {verificationStatus && <div className="text-zinc-600 text-3xl font-bold">{verificationStatus}</div>}
                    {error && <div className="text-red-600">{error}</div>}

                    <div className={`${showDirect ? "block" : "hidden"}`}>Not Redirecting?
                        <p className="text-myBlue underline">
                            <NextLink href={"/auth/login"}>Click here to login</NextLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

