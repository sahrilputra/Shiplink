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
            my_address_id,
            streat_address,
            city,
            province_code,
            country_code,
            postal_code,
            email,
            phone_number,
            primary_address,
            action
        } = await request.json();
        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/MyAddress/My_Address_setdata`,
            {
                "my_address_id": my_address_id,
                "streat_address": streat_address,
                "city": city,
                "province_code": province_code,
                "country_code": country_code,
                "postal_code": postal_code,
                "email": email,
                "phone_number": phone_number,
                "primary_address": primary_address,
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

