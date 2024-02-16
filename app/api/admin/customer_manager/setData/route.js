import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {

    try {
        const { customer_id, customer_name, customer_plans, country_code, email, password } = await request.json();

        const response = await axios.post('https://sla.webelectron.com/api/Auth/GetToken', {
            customer_id: "",
            customer_name: customer_name,
            customer_plans: customer_plans,
            country_code: country_code,
            email: email,
            password: password,
        }, {
            httpsAgent: agent
        });

        console.log("response", response.data); // Log the response data

        const token = response.data.token;
        cookies().set('token', token, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            secure: true,
            sameSite: 'strict'
        })

        cookies().set('user', username, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            secure: true,
            sameSite: 'strict'
        })

        if (response.status === 200) {

            return NextResponse.json({ message: response.data.message }, { status: 200 });
        } else {
            return NextResponse.error({ message: response.data.message }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

