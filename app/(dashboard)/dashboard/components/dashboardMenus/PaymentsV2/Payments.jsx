'use client'
import React, { useState } from 'react'
import { DialogHeader, DialogTrigger, DialogFooter, DialogDescription, DialogContent } from '@/components/ui/dialog'
import * as yup from 'yup'
import { NewPaymentsCard } from './NewPaymentsCard'
import { Toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'

const formSchema = yup.object().shape({
    cardType: yup.string().required(),
    cardNumber: yup.string().required(),
    cardHolderName: yup.string().required(),
    expiryDate: yup.string().required(),
    cvv: yup.string().required(),

})


export const PaymentsDialog = ({ variant = "", click, isSelectedButton, isButtonEnabled }) => {
    const [select, isSelected] = useState(false);
    const toggleSelect = (selectedButtons) => { isSelected(selectedButtons) }


    return (
        <>
                {
                    variant === 'confirm' ? (
                        <>
                            <DialogTrigger asChild>
                                <Button
                                    variant={`${isSelectedButton === "hold for pickup" ? "destructive" :  (isButtonEnabled ? "destructive" : "disable")}`}
                                    className="w-[140px] px-3 py-[5px] justify-center items-center gap-2.5 flex"
                                    size="sm"
                                    onClick={() => {
                                        click('hold for pickup')
                                    }}
                                >
                                    <div className="text-justify text-white text-xs font-semiBold ">Hold for Pickup</div>
                                </Button>
                            </DialogTrigger>
                        </>
                    ) : (
                        <>
                            <DialogTrigger asChild>
                                <Button
                                    className="h-[35px] px-10"
                                    variant="secondary"
                                >
                                    <p className="text-white text-xs font-medium ">Confirm</p>
                                </Button>
                            </DialogTrigger>
                        </>
                    )
                }

            <DialogContent>
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
                            onClick={() => toggleSelect(true)}>
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
            </DialogContent>
        </>
    )
}
