import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { CreateNewUserForms } from '../forms/CreateNewUsersForms'
import { Loaders } from '@/components/ui/loaders'
export const NewUserDialog = ({ open, setOpen, reload }) => {

    const [loading, setLoading] = useState(false)
    const closeDialog = () => setOpen(false)
    return (
        <>
            {loading ? (
                <Loaders />
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <p>Create New User</p>
                        </DialogHeader>
                        <div>
                            <CreateNewUserForms close={closeDialog} setLoading={setLoading} reload={reload} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}

        </>
    )
}
