import DraggableRange, {
    RangeData,
} from "@/components/draggable-range/DraggableRange";
import { fetchRangeData } from "./_lib/api-calls";

export default async function Page() {
    const data = await fetchRangeData();
    if (!data) {
        return (
            <div className="py-3 px-5 border-2 border-red-600 rounded">
                <p className="text-red-500">
                    Could not fetch range data from the backend!
                </p>
            </div>
        );
    }

    const rangeArray = data.rangeArray;
    const sortedRange = rangeArray.toSorted((a, b) => a - b);
    const rangeData: RangeData = {
        minLimit: sortedRange[0],
        maxLimit: sortedRange[sortedRange.length - 1],
    };

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1 className="text-2xl">Exercise 2 - Fixed range use case</h1>
            <DraggableRange
                data={rangeData}
                valueLabel="€"
                rangeValues={rangeArray}
                inmutableLabels={true}
            />
        </div>
    );
}
