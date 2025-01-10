import { NextResponse } from "next/server";

export async function GET() {
    const minLimit = 0;
    const maxLimit = 100;
    return NextResponse.json({
        minLimit, maxLimit
    });
}
