import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            customer_id,
            name,
            email,
            password,
            phoneNumber,
            image,
        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Customers/Customer_setdata_update`,
            {
                "customer_id": customer_id,
                "name": name,
                "email": email,
                "password": password,
                "phone_number": phoneNumber,
                "image": image,
            },
            {
                httpsAgent: agent
            }
        );
        console.log("Response from API", response.data.message)
        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error(
                { message: response.data.message },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

