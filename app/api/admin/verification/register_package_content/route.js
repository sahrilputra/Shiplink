import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const requestData = await request.json(); // Mengambil data JSON dari permintaan
        console.log("Diterima : ", requestData);

        // Pastikan data yang diterima dalam bentuk array
        if (!Array.isArray(requestData)) {
            return new Response("Invalid data format. Expecting an array.", { status: 400 });
        }

        const response = await axios.post(
            `${process.env.API_URL}/Package/Register_package_content`,
            requestData, 
            {
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
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

