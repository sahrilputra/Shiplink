import React from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { useRouter } from "next/router";
import { CheckCircle, XCircleIcon, Loader2 } from "lucide-react";
import { Loaders } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";

export default function CheckoutForm({ totalAmount, close, services, setOpen, trackingId, clientSecret, reload, handleSubmitForms }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [displayForm, setDisplayForm] = React.useState(true);
    const [paymentStatus, setPaymentStatus] = React.useState(null);
    const [backStatus, setBackStatus] = React.useState(null);


    const confirmPayment = async (paymentIntent, paymentIntentClientSecret, trackingId) => {
        try {
            const response = await axios.post(
                '/api/admin/payments/confirm',
                {
                    payment_intent: paymentIntent,
                    payment_intent_client_secret: paymentIntentClientSecret,
                    tracking_id: trackingId,
                },
            );
            console.log("🚀 ~ confirmPayment ~ response:", response)
            if (response.status === 200) {
                console.log("🚀 ~ confirmPayment ~ response:", response)
                setBackStatus(response.data.message);
            } else {
                console.log("🚀 ~ confirmPayment ~ response:", response)
                setBackStatus(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard`,
            },
            redirect: "if_required",
        });

        setIsLoading(false);
        setDisplayForm(false);
        if (error) {
            setMessage(error.message);
            setPaymentStatus("failed");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("🚀 ~ handleSubmit ~ paymentIntent:", paymentIntent)
            setMessage("Payment succeeded!");
            setPaymentStatus("succeeded");
            confirmPayment(paymentIntent.id, paymentIntent.client_secret, trackingId);
            handleSubmitForms();
            reload();

        } else {
            setMessage("Your payment was not successful, please try again.");
            setPaymentStatus("failed");
        }
    };

    const paymentElementOptions = {
        layout: "tabs",
        defaultCollapsed: false,
    };

    return (
        <>
            {isLoading && <Loaders />}
            {paymentStatus === "succeeded" && (
                <div className="flex flex-col gap-3 items-center">
                    <CheckCircle width={100} height={100} className="text-greenStatus " />
                    <p className="text-2xl">Success</p>
                    <p className="text-xs">{message}</p>
                </div>
            )}
            {paymentStatus === "failed" && (
                <div className="modal">
                    <div className="flex flex-col gap-3 items-center">
                        <XCircleIcon width={100} height={100} className="text-red-700 " />
                        <p className="text-2xl">Failed</p>
                        <p className="text-xs">{message}</p>
                    </div>
                </div>
            )}
            {displayForm && (
                <form id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" options={paymentElementOptions} />
                    <div className="flex flex-col gap-1 pt-2">
                        {services.map((service, index) => (
                            <div key={index} className="flex flex-row w-full justify-between text-xs">
                                <p>{service.item}</p>
                                <p>{`$ ${service.price}`}</p>
                            </div>
                        ))}
                        <div className="flex flex-row w-full justify-between text-xs py-2">
                            <Separator className="h-[1px] w-full" />
                        </div>
                        <div className="flex flex-row w-full justify-between text-xs py-2">
                            <p className='font-bold'>Total : </p>
                            <p className='font-bold'>{`$ ${totalAmount}`}</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row gap-3 pt-3">
                        <Button
                            variant="redOutline"
                            size="sm"
                            className=" w-full text-xs"
                            onClick={() => {
                                close();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            id="submit"
                            size="sm"
                            className=" w-full text-xs"
                            variant="destructive"
                        >
                            Pay
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
}