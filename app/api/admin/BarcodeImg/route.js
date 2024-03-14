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
        const { data } = await request.json();
        console.log("code : ", { data })
        const response = await axios.get(
            `https://sla.webelectron.com/api/Package/barcode_trackingid?tracking_id=${data}`,
            {
                httpsAgent: agent,
                responseType: 'arraybuffer'
            }
        );
        const imageBuffer =  Buffer.from(response.data, 'binary');
        const base64Image = imageBuffer.toString('base64');
        const image = `data:image/png;base64,${base64Image}`;

        console.log("🚀 ~ POST ~ image:", image)
        if (response.status === 200) {
            const responseData = {
                status: true,
                data: image
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

