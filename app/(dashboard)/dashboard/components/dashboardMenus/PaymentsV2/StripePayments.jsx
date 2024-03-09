import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePayments = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error('Error:', error);
            setLoading(false);
        } else {
            console.log('Payment Method:', paymentMethod);
            setLoading(false);
            // Handle successful payment here, like sending paymentMethod.id to your server
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>CARD</p>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Loading...' : 'Pay with Stripe'}
            </button>
        </form>
    );
};

const WrappedStripePayments = () => {
    return (
        <Elements stripe={loadStripe(process.env.STRIPE_PUBLIC_KEY)}>
            <StripePayments />
        </Elements>
    );
};

export default WrappedStripePayments;