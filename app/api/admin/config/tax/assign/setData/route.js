import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const { tax_assignment_id, tax_assignment_name, abbreviation, tax_number, tax_rate, country_code, action } = await request.json();
        const tokenAccess = await getAccessToken(request)
        console.log("🚀 ~ POST ~ country_code:", country_code)
        // console.log("token from country", token)
        const response = await axios.post(
            `${process.env.API_URL}/Config/TaxAssignment_setdata`,
            {
                tax_assignment_id: tax_assignment_id,
                tax_assignment_name: tax_assignment_name,
                abbreviation: abbreviation,
                tax_number: tax_number,
                country_code: country_code,
                tax_rate: tax_rate,
                action: action,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                }
            }
        );

        console.log("response from api : ", response.data); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
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

