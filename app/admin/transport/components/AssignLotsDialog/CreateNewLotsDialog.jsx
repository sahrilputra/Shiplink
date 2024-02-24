import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { NewLotsFrom } from "./NewLotForms"
import { Form } from "@/components/ui/form"
import { useState } from "react"
import axios from "axios";
import React from 'react'

export function CreateNewLotsDialog({ open, setOpen }) {
    const [select, setSeleceted] = useState("New");

    const close = () => {
        setOpen(false)
    }
    const handleSelect = (e) => {
        setSeleceted(e)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <Form>
                    <form action="#">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex flex-col gap-2 font-bold">
                                    <p>Create New Lots</p>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <div className="flex flex-col gap-2 ">
                                <div className="flex flex-row gap-3 text-sm text-center">
                                    <div
                                        className={`${select === "New" ? "text-myBlue border-b border-myBlue" : ""} cursor-pointer`}>
                                        New Lot
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <div className="flex flex-col gap-2 pt-3">
                                    <NewLotsFrom close={close} />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
