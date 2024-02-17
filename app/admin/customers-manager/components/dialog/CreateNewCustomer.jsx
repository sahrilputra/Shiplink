import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { NewCustomerForms } from '../forms/NewCustomer'

export default function CreateNewCustomer({ open, setOpen }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="font-bold">Create New Customer</DialogTitle>
                </DialogHeader>
                <div className="w-[400px]">
                    <NewCustomerForms />
                </div>
            </DialogContent>
        </Dialog>
    )
}
