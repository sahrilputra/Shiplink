import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            Type,
            SCAC,
            CodeStart,
            CodeRange,
            action,
            dataId,
        } = await request.json();
        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/ParsPaps/set_sequence`,
            {
                id: dataId,
                type: Type,
                carrier_code: SCAC,
                code_range: CodeRange,
                code_start: CodeStart,
                action: action

            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                },
            }
        );

        console.log("Response from API", response);

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
