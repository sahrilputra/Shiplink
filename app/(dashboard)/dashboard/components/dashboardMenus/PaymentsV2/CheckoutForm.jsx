import React from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { useRouter } from "next/router";
import { CheckCircle, XCircleIcon, Loader2 } from "lucide-react";
import { Loaders } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";

export default function CheckoutForm({ totalAmount, close, services, setOpen }) {
    console.log("🚀 ~ CheckoutForm ~ totalAmount:", totalAmount)
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [displayForm, setDisplayForm] = React.useState(true);
    const [status, setStatus] = React.useState("");
    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            setDisplayForm(false)
            setStatus(paymentIntent.status)
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/dashboard`,
            },
            redirect: "if_required",
        });
        console.log("🚀 ~ handleSubmit ~ error:", error)

        if (error) {
            setMessage(error.message);
            setStatus("failed");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment succeeded!");
            setStatus("succeeded");
        } else {
            setTimeout(() => {
                stripe.retrievePaymentIntent(paymentIntent.client_secret).then(({ paymentIntent }) => {
                    if (paymentIntent.status === "succeeded") {
                        setMessage("Payment succeeded!");
                        setStatus("succeeded");
                    } else {
                        setMessage("Your payment was not successful, please try again.");
                        setStatus("failed");
                    }
                });
            }, 5000);
        }
        setIsLoading(false);
        setDisplayForm(false);
        setOpen(true);
    };

    const paymentElementOptions = {
        layout: "tabs",
        defaultCollapsed: false,
    };
    return (
        <>

            {isLoading && <Loaders />}
            {
                displayForm !== true &&
                (
                    status === "succeeded" ? (
                        <div className="flex flex-col gap-3 items-center">
                            <CheckCircle width={100} height={100} className="text-greenStatus " />
                            <p className="text-2xl">Sucess</p>
                            <p className="textxs">{message}</p>
                        </div>
                    ) : (
                        <div className="modal">
                            <div className="flex flex-col gap-3 items-center">
                                <XCircleIcon width={100} height={100} className="text-red-700 " />
                                <p className="text-2xl">Failed</p>
                                <p className="textxs">{message}</p>
                            </div>
                        </div>
                    )
                )
            }

            {
                displayForm && (
                    <form id="payment-form" onSubmit={handleSubmit}>
                        <PaymentElement id="payment-element" options={paymentElementOptions} />

                        <div className="flex flex-col gap-1">
                            {
                                services.map((service, index) => (
                                    <div key={index} className="flex flex-row w-full justify-between text-xs">
                                        <p>{service.item}</p>
                                        <p>{`$ ${service.price}`}</p>
                                    </div>
                                ))
                            }
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
                                    close()
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
                        {/* Show any error or success messages */}
                        {/* {message && <div id="payment-message">{message}</div>} */}
                    </form>
                )
            }

        </>
    );
}