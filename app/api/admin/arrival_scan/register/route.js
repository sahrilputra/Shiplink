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
            package_content,
            box_images,
            label_images,
            content_images,
        } = await request.json();

        console.log("ACEPETED")
        console.log("package_content:");

        const response = await axios.post(
            `${process.env.API_URL}/Package/Register_package`,
            {
                customer_id: customer_id,
                customer_name: customer_name,
                customer_phone: customer_phone,
                customer_email: customer_email,
                barcode_tracking: barcode_tracking,
                carrier_code: carrier_code,
                package_length: package_length,
                package_witdth: package_witdth,
                package_height: package_height,
                package_height_unit: package_height_unit,
                package_weight: package_weight,
                package_weight_unit: package_weight_unit,
                bin_location: bin_location,
                total_price: total_price,
                package_content: package_content,
                box_images: box_images,
                label_images: label_images,
                content_images: content_images,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${process.env.BEARER_TOKEN}`
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
