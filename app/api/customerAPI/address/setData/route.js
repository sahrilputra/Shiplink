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
            streat_address,
            my_address_id,
            city,
            province_code,
            country_code,
            zipCode,
            email,
            phoneNumber,
            isPrimary,
            fullName,
            action
        } = await request.json();
        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/MyAddress/My_Address_setdata`,
            {
                "my_address_id": my_address_id,
                "full_name": fullName,
                "streat_address": streat_address,
                "city": city,
                "province_code": province_code,
                "country_code": country_code,
                "postal_code": zipCode,
                "email": email,
                "phone_number": phoneNumber,
                "primary_address": isPrimary,
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

