'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const MovePackageDialog = ({ open, setOpen }) => {
    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold">Move Package</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-2 text-black">
                        <p>10 Items Selected Move This Items</p>
                        <div className="flex flex-col gap-1 justify-start py-2">
                            <p className='text-sm'>Select Bin</p>
                            <Select>
                                <SelectTrigger className="w-[100%]">
                                    <SelectValue placeholder="Bin" />
                                </SelectTrigger>
                                <SelectContent className='text-xs'>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <div className="flex flex-row justify-center w-full gap-4">
                        <DialogClose asChild>
                            <Button
                                variant="redOutline"
                                className="w-full"
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            className="w-full"
                        >
                            <p className='text-xs'>Save</p>
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
