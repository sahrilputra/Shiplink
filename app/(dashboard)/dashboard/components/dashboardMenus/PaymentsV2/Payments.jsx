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

const stripePromise = loadStripe(`pk_test_51OeSr9KoBG6qVutm67f3Sp0NSBReb8UZ9mAeiIseio551KQCV6VlXY7Yq9YpC0grIMUjUr2Y6HzGecCBLZPMhboW00fET9LdVY`);

export const PaymentsDialog = ({ open, setOpen, trackingId, reload, type, forms, selectedBroker }) => {
    console.log("🚀 ~ PaymentsDialog ~ open:", open)
    console.log("🚀 ~ PaymentsDialog ~ trackingId:", trackingId)
    const toggleSelect = (selectedButtons) => { isSelected(selectedButtons) }
    const [clientSecret, setClientSecret] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [services, setServices] = useState([]);


    // useEffect(() => {
    //     axios.post("/api/admin/payments/create-payments", {
    //         data: { amount: 89 },
    //     }).then((response) => {
    //         console.log("🚀 ~ useEffect ~ response:", response)
    //         setClientSecret(response.data);
    //     });

    // }, [])

    console.log("BROKER: ", forms?.watch("warehouse"))

    // useEffect(() => {
    //     const handleHoldPickup = async () => {
    //         try {
    //             axios.post(
    //                 '/api/admin/actions/holdPickup',
    //                 {
    //                     tracking_id: trackingId
    //                 },
    //             ).then((response) => {
    //                 console.log("🚀 ~ ).then ~ response:", response)
    //                 setClientSecret(response.data.clientSecret);
    //                 setTotalAmount(response.data.total);
    //                 setServices(response.data.services);
    //             }).catch((error) => {
    //                 console.log("🚀 ~ ).catch ~ error:", error)
    //             })
    //         } catch (error) {
    //             console.log("🚀 ~ ).catch ~ error:", error)
    //         }
    //     }


    // }, [trackingId, type, forms]);


    const [showSkip, setShowSkip] = useState(false);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const close = () => {
        setOpen(false);
    }

    const handleHoldPickup = async () => {
        try {
            axios.post(
                '/api/admin/actions/holdPickup',
                {
                    tracking_id: trackingId
                },
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                setClientSecret(response.data.clientSecret);
                setTotalAmount(response.data.total);
                setServices(response.data.services);
            }).catch((error) => {
                console.log("🚀 ~ ).catch ~ error:", error)
            })
        } catch (error) {
            console.log("🚀 ~ ).catch ~ error:", error)
        }
    }

    const handleCrossBorder = async () => {
        console.log("running")
        try {
            const response = await axios.post(
                '/api/admin/actions/cross_border',
                {
                    "tracking_id": trackingId,
                    "broker": selectedBroker,
                    "file_invoices": [],
                    "warehouse_destination": "WR Tester, USA",
                    "entry_number": forms?.watch("entry_number"),
                    "parspaps_number": forms?.watch("pars"),
                },
            )

            console.log("🚀 ~ handleCrossBorder ~ response:", response)
            if (response.status === 200) {
                console.log("🚀 ~ handleCrossBorder ~ SUCESS:")
                setTotalAmount(response.data.total);
                setServices(response.data.services);
            } else {
                console.log("🚀 ~ handleCrossBorder ~ FAIL:")
            }

        } catch (error) {
            console.log("🚀 ~ ).catch ~ error:", error)
        }
    }

    if (open === true || open === "true") {
        if (type === "Hold Pickup") {
            handleHoldPickup()
        } else if (type === "CrossBorder") {
            setShowSkip(true)
            handleCrossBorder()
        }
    }
    console.log("WATHCING :", forms?.watch("package_content"))
    const handleSubmitForms = () => {
        try {
            const dataToSend = forms?.watch("package_content").map((item) => {
                console.log("🚀 ~ dataToSend ~ item:", item)
                // Konversi qty dan value menjadi number
                const qty = parseInt(item.qty);
                const value = parseInt(item.value);

                // // Validasi nilai yang diperlukan
                // if (!item.tracking_id || !qty || !value) {
                //     throw new Error("Tracking ID, qty, and value are required fields.");
                // }
                return {
                    id: "",
                    tracking_id: trackingId,
                    qty: qty,
                    value: value,
                    desc: item.desc,
                    hs_desc: item.hs_desc,
                    hs_code: item.hs_code,
                    made_in: item.made_in,
                    subtotal: item.subtotal
                };
            });

            const response = axios.post(
                `/api/admin/verification/register_package_content`,
                dataToSend
            );
            console.log('Response:', response);
            setOpen(false);
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <p>Confirm Payments</p>
                    </DialogHeader>
                    <div className="App">
                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm close={close} totalAmount={totalAmount} services={services} setOpen={setOpen} trackingId={trackingId} clientSecret={clientSecret} reload={reload} />
                            </Elements>
                        )}
                    </div>
                    {
                        showSkip && (
                            <Button
                                variant="destructive"
                                type="button"
                                onClick={() => {
                                    handleSubmitForms();
                                }}
                            >
                                Skip For Now
                            </Button>
                        )
                    }
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


