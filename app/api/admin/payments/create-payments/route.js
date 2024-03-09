// This is your test secret API key.
import { NextResponse, NextRequest } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: 'Shiplink API',
    version: '0.1.0',
  },
});

export async function POST(request) {
  const { data } = await request.json();
  const { amount } = data;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'USD',
      description: 'Shiplink Payment',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("🚀 ~ POST ~ paymentIntent:", paymentIntent)
    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
