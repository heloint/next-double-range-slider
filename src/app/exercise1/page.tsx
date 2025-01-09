import DraggableRange from "./_components/draggable-range/DraggableRange";
import { fetchRangeData } from "./_lib/api-calls";

export default async function Page() {
    const rangeData = await fetchRangeData();

    return (
        <div className="flex flex-col w-100 h-[30rem] justify-center items-center">
            <h1 className="text-2xl">Exercise 1 - Draggable range slider with double thumbs</h1>
            {rangeData ? (
                <DraggableRange data={rangeData} />
            ) : (
                <div className="py-3 px-5 border-2 border-red-600 rounded">
                    <p className="text-red-500">
                        Could not fetch range data from the backend!
                    </p>
                </div>
            )}
        </div>
    );
}
