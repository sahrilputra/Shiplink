import { NextResponse } from "next/server"
import axios from "axios";

export async function GET(request) {
    return new NextResponse("hello from login POST")
}