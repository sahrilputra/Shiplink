'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as yup from 'yup'
import { Toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51OsLjTIGSvEkqmVc4z0PqiZRyN6K6KGUZxcEOFo6HqZoMHf7koqsE9DBQ3RuwZnLhz4T2MXdGSzrEZuhs2dUZ2Vv00mnKFQR4G');

export const PaymentsDialog = ({ open, setOpen }) => {
    const toggleSelect = (selectedButtons) => { isSelected(selectedButtons) }

    const [clientSecret, setClientSecret] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        axios.post("/api/admin/payments/create-payments", {
            data: { amount: 89 },
        }).then((response) => {
            console.log("🚀 ~ useEffect ~ response:", response)
            setClientSecret(response.data);
        });

    }, [])
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <p>Confirm Payments</p>
                    </DialogHeader>
                    <div className="App">
                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </div>

                </DialogContent>
            </Dialog>

        </>
    )
}
{/* <div className="select">
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
                </DialogDescription> */}


