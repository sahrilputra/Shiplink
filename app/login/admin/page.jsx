'use client'
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
export default function Home() {

    return (
        <>
            <div className="flex flex-col text-center justify-center items-center w-full h-[100vh] gap-[20px]">
                <div className="flex flex-col gap-[20px]">
                    <div className="text-myBlue text-sm font-bold">Admin Log In</div>
                    <div className="text-black font-bold text-lg">Hello Admin!</div>
                </div>
                <div className="p-4 bg-white rounded-md w-[500px] border shadow-md gap-2 flex flex-col">
                    <div className="flex flex-col text-left">
                        <p className="text-xs text-left px-1">Email</p>
                        <Input
                            className="text-xs h-9 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                            type='email'
                            placeholder="email" />
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-xs text-left px-1">Password</p>
                        <Input type='password' placeholder="email" />
                    </div>

                    <div className="flex flex-row justify-between items-center py-2 px-1">
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <label
                                htmlFor="terms"
                                className="text-sm text-red-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Forget password?
                            </label>
                        </div>
                    </div>

                    <div className="w-full py-3">
                        <Button
                            variant="secondary"
                            className="w-full">
                            <p className="text-sm">Login</p>
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}