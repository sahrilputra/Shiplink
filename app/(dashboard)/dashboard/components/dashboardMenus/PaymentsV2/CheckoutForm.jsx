import React from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import axios from 'axios'
export default function CheckoutForm({ totalAmount }) {
    console.log("🚀 ~ CheckoutForm ~ totalAmount:", totalAmount)
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

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

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
        defaultCollapsed: false,
    };
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <div className="flex flex-row w-full justify-between text-xs py-3">
                <p className='font-bold'>Total : </p>
                <p className='font-bold'>{`$ ${totalAmount}`}</p>
            </div>
            <div className="w-full flex flex-row gap-3 pt-3">
                <Button
                    variant="redOutline"
                    size="sm"
                    className=" w-full text-xs"
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
    );
}