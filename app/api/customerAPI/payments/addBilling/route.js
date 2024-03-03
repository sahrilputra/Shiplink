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
            billing_id = "",
            fullName,
            phone_number,
            email,
            street_address,
            city,
            province_code,
            country_code,
            postal_code,
            credit_card_id = "",
            action,
        } = await request.json();
        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/Customers/Add_Billing`,
            {
                "billing_id": billing_id,
                "name": fullName,
                "phone_number": phone_number,
                "email": email,
                "street_address": street_address,
                "city": city,
                "province_code": province_code,
                "country_code": country_code,
                "postal_code": postal_code,
                "credit_card_id": credit_card_id,
                "action": action

            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                }
            }
        );
        console.log("🚀 ~ POST ~ response:", response)

        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error({ message: response.data.message }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

