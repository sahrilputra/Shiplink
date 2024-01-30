import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const SequencesDetails = ({ open, onOpen }) => {
    console.log('myOpen', open)
    console.log('iamshowing')
    const handleOpen = () => {
        onOpen(true)
    }
    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogTrigger asChild>
                <p className="text-xs text-myBlue">View Sequence Details</p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Showing Sequence Details</DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col">
                            <p>Type : PARS </p>
                            <p>ID : #12312</p>
                            <p>Range : 1213123121 - 1213123152</p>
                            <p>Create At : 12/10/2023 22:10:20</p>
                        </div>
                    </DialogDescription>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
