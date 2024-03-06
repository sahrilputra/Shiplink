import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        const {
            product_id = "",
            item,
            brand,
            model,
            category_id,
            description,
            price,
            image,
            action
        } = await request.json();

        const response = await axios.post(
            `https://sla.webelectron.com/Products/Products_setdata`,
            {
                product_id: product_id,
                item: item,
                brand: brand,
                model: model,
                category_id: category_id,
                description: description,
                price: price,
                image: image,
                action: action
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

