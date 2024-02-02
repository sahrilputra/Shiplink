import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { CreateNewUserForms } from '../forms/CreateNewUsersForms'
export const NewUserDialog = ({ open, setOpen }) => {
    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <p>Create New User</p>
                </DialogHeader>
                <DialogDescription>
                    <CreateNewUserForms close={onClose} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
