import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { cookies } from "next/headers";

const agent = new https.Agent({
    rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
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
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmN2U5NzcyYy03NmUxLTRiNDItODg3Mi01NWVkYTMzZjEyZTUiLCJyb2xlIjoic3VwZXJhZG1pbiIsInVuaXF1ZV9uYW1lIjoic3VwZXJhZG1pbiIsIm5iZiI6MTcwNzY0MDM1NSwiZXhwIjoxNzA3NjgzNTU1LCJpYXQiOjE3MDc2NDAzNTV9.6KOCvrtE2m_Tm3JDX2-WAYNCa4Gv8D3CghuUhXG6DFo`,
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
