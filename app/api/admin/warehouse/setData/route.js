import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";

const agent = new https.Agent({
    rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        const {
            warehouse_id = "",
            warehouse_name,
            phone_number,
            country_code,
            address,
            warehouse_catalog,
            warehouse_manager,
            email,
            action,
        } = await request.json();

        console.log("getReq", request.body, warehouse_id, warehouse_name, phone_number, country_code, address, warehouse_catalog, warehouse_manager, email, action)

        const response = await axios.post(
            `${process.env.API_URL}/Warehouse/Warehouse_setdata`,
            {
                warehouse_id: warehouse_id,
                warehouse_name: warehouse_name,
                phone_number: phone_number,
                country_code: country_code,
                address: address,
                warehouse_catalog: warehouse_catalog,
                warehouse_manager: warehouse_manager,
                warehouse_bullet_setting: "none",
                email: email,
                action: action,
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
