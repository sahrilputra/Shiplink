'use client'
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
export default function Home() {

    return (
        <>
            <div className="flex flex-col text-center pt-[90px] items-center w-full h-[100vh] gap-[20px] bg-[#E3E7EE]">
                <div className="flex flex-col gap-5 py-10">
                    <div className="text-myBlue text-lg font-bold">Welcome Back</div>
                    <div className="text-zinc-600 text-3xl font-bold">Log In to start saving!</div>
                </div>
                <div className="p-10 bg-white rounded-md w-[640px] border shadow-md gap-8  flex flex-col">
                    <div className="flex flex-col text-left">
                        <p className="text-base text-left px-1">Email</p>
                        <Input
                            className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                            type='email'
                            placeholder="email" />
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-base text-left px-1">Password</p>
                        <Input
                            className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                            type='Passowrd'
                            placeholder="Password" />
                    </div>
                    <div className="flex flex-row justify-between items-center py-2 px-1">
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox id="terms" className="w-[20px] h-[20px]" />
                            <label
                                htmlFor="terms"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <label
                                htmlFor="terms"
                                className="text-base text-red-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Forget password?
                            </label>
                        </div>
                    </div>
                    <div className="w-full py-3">
                        <Button
                            variant="secondary"
                            className="w-full">
                            <p className="text-base">Login</p>
                        </Button>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-base">Don&apos;t have an account? <span className="text-red-700">Sign up now</span></p>
                    </div>

                </div>
            </div>
        </>
    )
}