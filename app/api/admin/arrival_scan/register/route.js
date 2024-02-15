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
            customer_name,
            customer_phone,
            customer_email,
            barcode_tracking,
            carrier_code,
            package_length,
            package_witdth,
            package_height,
            package_height_unit,
            package_weight,
            package_weight_unit,
            bin_location,
            total_price,
            package_content: [
                {
                    id,
                    tracking_id,
                    qty,
                    value,
                    desc,
                    hs_desc,
                    hs_code,
                    made_in,
                    subtotal
                }
            ],
            box_images: [
            ],
            label_images: [

            ],
            content_images: [
            ]
        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Package/Register_package`,
            {
                customer_id: customer_id,
                customer_name: customer_name,
                customer_phone: customer_phone,
                customer_email: customer_email,
                carrier_code: carrier_code,
                package_length: package_length,
                package_witdth: package_witdth,
                package_height: package_height,
                package_height_unit: package_height_unit,
                package_weight: package_weight,
                package_weight_unit: package_weight_unit,
                bin_location: bin_location,
                total_price: total_price,
                package_content: [

                    {
                        id: id,
                        tracking_id: tracking_id,
                        qty: qty,
                        value: value,
                        desc: desc,
                        hs_desc: hs_desc,
                        hs_code: hs_code,
                        made_in: made_in,
                        subtotal: subtotal,
                    }
                ],
                box_images: [
                ],
                label_images: [
                ],
                content_images: [
                ]
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmN2U5NzcyYy03NmUxLTRiNDItODg3Mi01NWVkYTMzZjEyZTUiLCJyb2xlIjoic3VwZXJhZG1pbiIsInVuaXF1ZV9uYW1lIjoic3VwZXJhZG1pbiIsIm5iZiI6MTcwNzY0MDM1NSwiZXhwIjoxNzA3NjgzNTU1LCJpYXQiOjE3MDc2NDAzNTV9.6KOCvrtE2m_Tm3JDX2-WAYNCa4Gv8D3CghuUhXG6DFo`
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

