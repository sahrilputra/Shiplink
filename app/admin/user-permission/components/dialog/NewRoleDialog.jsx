import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { CreateNewRolesForms } from '../forms/CreateNewRolesForms'
export const NewRoleDialog = ({ open, setOpen }) => {
    const onClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <p>Create New Role</p>
                </DialogHeader>
                <DialogDescription>
                    <CreateNewRolesForms close={onClose} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
