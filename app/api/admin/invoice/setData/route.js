import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { cookies } from "next/headers";
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        // const tokenAccess = await getAccessToken(request)
        const {
            date,
            InvoiceNo,
            InvoiceDate,
            InvoiceCurrency,
            InvoiceTerms,
            BilledToName,
            BilledToAddress,
            BilledToZip,
            BilledToCountry,
            ShippedToName,
            ShippedToAddress,
            ShippedToZip,
            ShippedToCountry,
            note,
            userName,
            userID,
            userCode,
            userPhone,
            userEmails,
            items,
            itemTax,
            itemTotal,
            itemDiscount,
            action,
        } = await request.json();

        console.log("REQUEST DATA : ", request.body);

        const response = await axios.post(
            `${process.env.API_URL}/InvoiceManager/Invoice_setdata`,
            {
                date: date,
                currency: InvoiceCurrency,
                terms: InvoiceTerms,
                billed_name: BilledToName,
                billed_zip: BilledToZip,
                billed_address: BilledToAddress,
                billed_country: BilledToCountry,
                shipped_name: ShippedToName,
                shipped_zip: ShippedToZip,
                shipped_address: ShippedToAddress,
                shipped_country: ShippedToCountry,
                subtotal: 0,
                tax_id: "string",
                tax_value: itemTax,
                discount: itemDiscount,
                total: itemTotal,
                items: items,
                note: note,
                user_code: userID,
                email: userEmails,
                action: "add",
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${process.env.BEARER_TOKEN}`
                },
            }
        );

        console.log("Response Message : ", response.data.message);
        console.log("Response Status : ", response.status);
        console.log("Response data : ", response.data);


        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
                tracking_id: response.data.tracking_id,
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
