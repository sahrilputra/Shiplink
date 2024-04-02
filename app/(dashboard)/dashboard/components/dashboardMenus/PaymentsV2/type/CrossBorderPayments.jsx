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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios'
import CheckoutForm from '../CheckoutForm';

const GetPayments = async () => {
    try {
        const response = await axios.get('/api/admin/config/payments/getData');
        const responseData = response.data.data;
        return responseData.publishableKey;
    } catch (error) {
        console.error("Error fetching publishable key:", error);
        throw error; // Re-throw the error to handle it at the caller level
    }
}

const stripePromise = GetPayments().then((publishableKey) => loadStripe(publishableKey));
console.log("🚀 ~ stripePromise:", stripePromise)


export const CrossBorderPayments = (
    {
        open,
        setOpen,
        trackingId,
        reload,
        type = "CrossBorder",
        forms,
        selectedBroker,
        toggleExpanded
    }
) => {

    console.log("🚀 ~ PaymentsDialog ~ type:", type)
    console.log("🚀 ~ PaymentsDialog ~ open:", open)
    console.log("🚀 ~ PaymentsDialog ~ trackingId:", trackingId)
    const toggleSelect = (selectedButtons) => { isSelected(selectedButtons) }
    const [clientSecret, setClientSecret] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [services, setServices] = useState([]);
    const [paymentPublic, setPayemntPublic] = useState("");
    // const stripePromise = loadStripe(paymentPublic);

    // useEffect(() => {
    //     const handlePayemnt = async () => {
    //         const response = await axios.get(
    //             `/api/admin/config/payments/getData`
    //         )
    //         const responseData = response.data.data
    //         console.log("🚀 ~ getPaymentAPI ~ response:", responseData.publishableKey)
    //         setPayemntPublic(responseData.publishableKey)
    //     }
    //     handlePayemnt();
    // }, [open])

    console.log("BROKER: ", forms?.watch("warehouse"))
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

    useEffect(() => {
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
                        "broker": forms?.watch("broker"),
                        "file_invoices": forms?.watch("invoice"),
                        "warehouse_destination": forms?.watch("warehouse"),
                        "entry_number": forms?.watch("entry_number"),
                        "parspaps_number": forms?.watch("pars"),
                    },
                )

                console.log("🚀 ~ handleCrossBorder ~ response:", response)
                if (response.status === 200) {
                    console.log("🚀 ~ handleCrossBorder ~ SUCESS:")
                    setClientSecret(response.data.clientSecret);
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
                handleCrossBorder()
            }
        }
    }, [open, type, forms, selectedBroker, trackingId]);


    console.log("WATHCING :", forms?.watch("package_content"))
    const handleSubmitForms = () => {
        try {
            const dataToSend = forms?.watch("package_content").map((item) => {
                console.log("🚀 ~ dataToSend ~ item:", item)
                const qty = parseInt(item.qty);
                const value = parseInt(item.value);
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
                                <CheckoutForm
                                    close={close}
                                    totalAmount={totalAmount}
                                    services={services}
                                    setOpen={setOpen}
                                    trackingId={trackingId}
                                    clientSecret={clientSecret}
                                    reload={reload}
                                    handleSubmitForms={handleSubmitForms}
                                    toggleExpanded={toggleExpanded}
                                    type={type}
                                />
                            </Elements>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}
