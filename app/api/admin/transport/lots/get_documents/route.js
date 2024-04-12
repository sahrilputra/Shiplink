import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";
import { Buffer } from "buffer"; // Import Buffer untuk konversi base64

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});

export async function POST(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        const { data } = await request.json(); // Untuk menggunakan data sebagai nama file, sesuai dengan request sebelumnya

        const apiUrl = `${process.env.API_URL}/Package/getimages?fullName=/Assets/doc/lots/${data}`;

        const response = await axios.get(
            apiUrl, // Menggunakan URL yang dihasilkan
            {
                httpsAgent: agent,
                responseType: 'arraybuffer' // Mengatur responseType agar respons berupa array buffer
            }
        );
        console.log("🚀 ~ POST ~ response:", response)

        if (response.status === 200) {
            // Konversi array buffer menjadi base64
            const base64Data = Buffer.from(response.data, 'binary').toString('base64');

            const responseData = {
                status: true,
                message: "Document converted to base64 successfully",
                base64Document: base64Data // Mengirim dokumen dalam format base64
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error({ message: "Failed to fetch document from the provided URL" }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
