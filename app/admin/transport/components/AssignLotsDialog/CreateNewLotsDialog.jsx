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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export function CreateNewLotsDialog({ open, setOpen, reload }) {
    const [select, setSeleceted] = useState("New");

    const close = () => {
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen} close={false} >
            <AlertDialogContent className="w-[450px] gap-0 p-0 px-8 py-5">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex flex-col gap-2 font-bold text-center">
                            <p>Create New Lots</p>
                        </div>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className="py-2 ">
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
                            <NewLotsFrom close={close} reload={reload} />
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
