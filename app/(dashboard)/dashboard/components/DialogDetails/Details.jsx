import React from 'react'
import { DialogHeader, DialogFooter, DialogDescription, DialogContent } from '@/components/ui/dialog'
import * as yup from 'yup'
import { Toast } from '@/components/ui/toast'


export const Details = () => {
    return (
        <>

            <DialogHeader>
                <p>Confirm Payments</p>
            </DialogHeader>
            <DialogDescription className="px-[10px] w-[98%] mx-auto">
            </DialogDescription>
        </>
    )
}
