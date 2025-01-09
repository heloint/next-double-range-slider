export type RangeData = {
    maxLimit: number;
    minLimit: number;
    defaultMaxValue: number;
    defaultMinValue: number;
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function fetchRangeData(): Promise<RangeData | null> {
    try {
        const response = await fetch(
            "http://localhost:8080/api/range-values/random",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
