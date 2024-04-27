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
            tax_assignment_id = "",
            tax_assignment_name,
            abbreviation,
            tax_number,
            tax_rate,
            country_code,
            province_code,
            status,
            show_inv_status,
            action,
        } = await request.json();

        console.log("request data : ", request.body); // Log the request body

        console.log("tax_assignment_id : ", tax_assignment_id);
        console.log("tax_assignment_name : ", tax_assignment_name);
        console.log("abbreviation : ", abbreviation);
        console.log("tax_number : ", tax_number);
        console.log("tax_rate : ", tax_rate);
        console.log("country_code : ", country_code);
        console.log("province_code : ", province_code);
        console.log("status : ", status);
        console.log("show_inv_status : ", show_inv_status);
        console.log("action : ", action);
        

        const response = await axios.post(
            `${process.env.API_URL}/Config/TaxAssignment_setdata`,
            {
                tax_assignment_id: tax_assignment_id,
                tax_assignment_name: tax_assignment_name,
                abbreviation: abbreviation,
                tax_number: tax_number,
                tax_rate: tax_rate,
                country_code: country_code,
                province_code: province_code,
                status: status,
                show_inv_status: show_inv_status,
                action: action
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${tokenAccess}`,
                },
            }
        );

        console.log("response from api : ", response); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
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
