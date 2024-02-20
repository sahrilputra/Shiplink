import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

const agent = new https.Agent({
    rejectUnauthorized: false // Hanya digunakan untuk pengembangan, non-produksi. Menonaktifkan verifikasi sertifikat SSL.
});

export async function POST(request) {
    try {
        const requestData = await request.json();

        const packageContentData = [];
        if (requestData.package_content && requestData.package_content.length > 0) {
            requestData.package_content.forEach(contentItem => {
                const {
                    id,
                    tracking_id,
                    qty,
                    value,
                    desc,
                    hs_desc,
                    hs_code,
                    made_in,
                    subtotal
                } = contentItem;

                packageContentData.push({
                    id,
                    tracking_id,
                    qty,
                    value,
                    desc,
                    hs_desc,
                    hs_code,
                    made_in,
                    subtotal
                });
            });
        }

        const dataToSend = {
            customer_id: requestData.customer_id,
            customer_name: requestData.customer_name,
            package_content: packageContentData,
            customer_phone: requestData.customer_phone,
            customer_email: requestData.customer_email,
            carrier_code: requestData.carrier_code,
            package_length: requestData.package_length,
            package_width: requestData.package_width, // Perbaikan typo, dari 'package_witdth' menjadi 'package_width'
            package_height: requestData.package_height,
            package_height_unit: requestData.package_height_unit,
            package_weight: requestData.package_weight,
            package_weight_unit: requestData.package_weight_unit,
            bin_location: requestData.bin_location,
            total_price: requestData.total_price,
            box_images: requestData.box_images || [],
            label_images: requestData.label_images || [],
            content_images: requestData.content_images || []
        };

        // Kirim permintaan ke backend
        const response = await axios.post(
            `${process.env.API_URL}/Package/Register_package`,
            dataToSend,
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
                message: response.data.message || "Success",
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error({ message: response.data.message || "Unknown error" }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
