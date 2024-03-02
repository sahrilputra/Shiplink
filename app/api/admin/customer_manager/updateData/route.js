import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {

    try {
        const {
            customer_id,
            name,
            email,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country,
        } = await request.json();

        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/Customers/Customer_setdata_update`,
            {
                customer_id: customer_id,
                customer_name: name,
                address: address,
                phone_number: phoneNumber,
                email: email,
                country_code: country,
                province_code: state,
                city: city,
                postal_code: zipCode,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                },
            }
        );
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

