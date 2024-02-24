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
            tax_assignment_id = "",
            TaxName,
            Abbreviation,
            TaxNumber,
            TaxRate,
            action,
        } = await request.json();


        console.log("Data Response : ",
            tax_assignment_id,
            TaxName,
            Abbreviation,
            TaxNumber,
            TaxRate,
            action,
        )

        const response = await axios.post(
            `${process.env.API_URL}/Config/TaxAssignment_setdata`,
            {
                tax_assignment_id: tax_assignment_id,
                tax_assignment_name: TaxName,
                abbreviation: Abbreviation,
                tax_number: TaxNumber,
                tax_rate: TaxRate,
                action: action,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                    "Content-Type": "text/plain",
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
