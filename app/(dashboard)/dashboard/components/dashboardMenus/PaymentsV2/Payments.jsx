'use client'
import React, { useState } from 'react'
import { DialogHeader, DialogFooter, DialogDescription, DialogContent } from '@/components/ui/dialog'
import * as yup from 'yup'
import { NewPaymentsCard } from './NewPaymentsCard'
import { Toast } from '@/components/ui/toast'

const formSchema = yup.object().shape({
    cardType: yup.string().required(),
    cardNumber: yup.string().required(),
    cardHolderName: yup.string().required(),
    expiryDate: yup.string().required(),
    cvv: yup.string().required(),

})


export const PaymentsDialog = () => {
    const [select, isSelected] = useState(false);
    const toggleSelect = (selectedButtons) => { isSelected(selectedButtons) }

    return (
        <>

            <DialogHeader>
                <p>Confirm Payments</p>
            </DialogHeader>
            <div className="select">
                <div className="justify-between items-start inline-flex gap-5">
                    <button className="flex-col justify-start items-center  inline-flex bg-none"
                        onClick={() => toggleSelect(false)}>
                        <div
                            className={`text-center text-sm font-Poppins 
                                ${select ? 'text-black font-medium'
                                    : ' border-b-2 border-myBlue font-semibold text-myBlue'}`}
                        >New Card</div>
                    </button>
                    <button
                        className="flex-col justify-start items-center  inline-flex bg-none"
                        onClick={() => toggleSelect(true) }>
                        <div
                            className={`text-center text-sm font-Poppins 
                                ${select ?
                                    ' border-b-2 border-myBlue  font-semibold text-myBlue'
                                    : 'text-black font-medium'}`}
                        >Saved Card</div>
                    </button>
                </div>
            </div>
            <DialogDescription className="px-[10px] w-[98%] mx-auto">
                <NewPaymentsCard />
            </DialogDescription>
        </>
    )
}
