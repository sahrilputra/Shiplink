import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

// const agent = new https.Agent({
//     rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
// });
export async function POST(request) {
    const { user } = await request.json();
    console.log("user", user);
    return NextResponse.json({ message: "Hello, " + user }, { status: 200 });
    // try {

    //     const { keyword, page, limit, index } = await request.json();
    //     const token = cookies(request).token;
    //     console.log("token from country", token);
    //     const response = await axios.post('https://sla.webelectron.com/api/Config/Country_list', {
    //         keyword: keyword,
    //         page: page,
    //         limit: limit,
    //         index: index,
    //     }, {
    //         httpsAgent: agent,
    //         headers: {
    //             Authorization: `Bearer ${token}` // Add the token to the request headers
    //         }
    //     });

    //     console.log("response", response.data); // Log the response data

    //     if (response.status === 200) {
    //         return NextResponse.json({ message: response.data.message }, { status: 200 });
    //     } else {
    //         return NextResponse.error({ message: response.data.message }, { status: 400 });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     return new Response("Internal Server Error", { status: 500 });
    // }
}

