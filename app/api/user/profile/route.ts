import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({sucess: true, data: {message: "hello world"}})
}
   