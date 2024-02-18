import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { NewCustomerForms } from '../forms/NewCustomer'
import { Loaders } from '@/components/ui/loaders'

export default function CreateNewCustomer({ open, setOpen, reload }) {
    const [loading, setLoading] = useState(false)
    const closeDialog = () => setOpen(false)
    return (
        <>
            {loading ?
                (
                    <Loaders />
                ) : (
                    <Dialog open={open} onOpenChange={setOpen}>
                        {/* <DialogTrigger>Open</DialogTrigger> */}
                        <DialogContent >
                            <DialogHeader>
                                <DialogTitle className="font-bold">Create New Customer</DialogTitle>
                            </DialogHeader>
                            <div className="w-[400px]">
                                <NewCustomerForms reload={reload} close={closeDialog} setLoading={setLoading} />
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            }
        </>

    )
}
