import { NextResponse } from "next/server";

export async function GET() {
    const maxLimit = 100;
    const minLimit = 0;
    const defaultMaxValue = getRandomFloat(minLimit + 1, maxLimit);
    const defaultMinValue = getRandomFloat(minLimit, defaultMaxValue - 1);
    return NextResponse.json({
        maxLimit, minLimit, defaultMaxValue, defaultMinValue
    });
}

function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
