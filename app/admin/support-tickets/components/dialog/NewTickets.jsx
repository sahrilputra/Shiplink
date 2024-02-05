import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateNewTicketsForms } from "./NewTicketsForms"
import React from 'react'

export default function CreateNewTickets({ open, setOpen }) {
    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}
            className="px-3"
        >
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Create New Tickets</p>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className=" w-[400px] flex justify-center items-center mx-auto">
                    <CreateNewTicketsForms close={onClose} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
