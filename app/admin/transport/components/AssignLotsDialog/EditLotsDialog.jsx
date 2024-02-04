import React from 'react'
import { NewLotsFrom } from './NewLotForms'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export const EditLotsDialog = ({ open, setOpen, data }) => {
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
                                    <p>Edit Lot</p>
                                </div>

                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <div className="flex flex-col gap-2 ">
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <div className="flex flex-col gap-2 py-4">
                                    <NewLotsFrom />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex flex-row justify-between w-full gap-3">
                                <DialogClose asChild>
                                    <Button
                                        className="w-full"
                                        variant="redOutline"
                                    >Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    className="w-full"
                                    variant="destructive"
                                >Save changes
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
