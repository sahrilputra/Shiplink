'use client'
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
export default function Home() {

    return (
        <>
            <div className="flex flex-col text-center pt-[90px] items-center w-full h-max min-h-[100vh] gap-[20px] bg-[#E3E7EE]">
                <div className="flex flex-col gap-4 py-8">
                    <div className="text-myBlue text-lg font-bold">Save money, save time, take control of your deliveries.</div>
                    <div className="text-zinc-600 text-3xl font-bold">Sign up to send and save instantly.</div>
                </div>
                <div className="p-10 mb-10 bg-white rounded-md w-[640px] border shadow-md gap-8  flex flex-col">
                    <div className="flex flex-col text-left gap-1">
                        <p className="text-base text-left px-1">Your Name</p>
                        <Input
                            className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                            type='text'
                            placeholder="email" />
                    </div>
                    <div className="flex flex-col text-left gap-1">
                        <p className="text-base text-left px-1">I plan to use Shiplink for</p>
                        <div className="flex flex-row gap-5">
                            <Input
                                className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                type='text'
                                placeholder="Business" />
                            <Input
                                className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                type='text'
                                placeholder="Persoal" />
                        </div>
                    </div>
                    <div className="flex flex-col text-left gap-1">
                        <p className="text-base text-left px-1">Country</p>
                        <Input
                            className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                            type='text'
                            placeholder="Au" />
                    </div>
                    <div className="flex flex-col text-left gap-1">
                        <p className="text-base text-left px-1">Email</p>
                        <Input
                            className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                            type='Email'
                            placeholder="Email" />
                    </div>
                    <div className="flex flex-col text-left gap-1">
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
                                By signing up you agree to our <span className="text-red-700">terms and conditions.</span>
                            </label>
                        </div>

                    </div>
                    <div className="w-full py-3">
                        <Button
                            variant="destructive"
                            className="w-full">
                            <p className="text-base">Get My Free Accout</p>
                        </Button>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-base">Already have an account? <span className="text-red-700">Log in now</span></p>
                    </div>

                </div>
            </div>
        </>
    )
}