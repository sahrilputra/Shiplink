'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateNewBinForms } from '../forms/CreateNewBinForms'
import { Loaders } from '@/components/ui/loaders'


export const CreateNewBinDialog = ({ open, setOpen, setReloadData }) => {
    const onClose = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)

    return (
        <>
            {
                loading ? (
                    <Loaders />
                ) : (
                    <Dialog open={open} onOpenChange={setOpen}
                        className="w-max"
                    >
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-bold">
                                    <p>Create New Country</p>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="">
                                <CreateNewBinForms close={onClose} setLoading={setLoading} reloadData={setReloadData} />
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            }

        </>
    )
}