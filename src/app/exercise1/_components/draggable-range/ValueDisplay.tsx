import { Dispatch, SetStateAction } from "react";

export default function ValueDisplay({
    value,
    valueLabel,
}: {
    value: number;
    valueLabel?: string;
    setValueAction: Dispatch<SetStateAction<number>>;
}) {
    return (
        <div
            className="text-sm text-center font-medium text-gray-700 w-16"
            style={{ left: `${value}%` }}
        >
            {value.toFixed(2)} {valueLabel ?? "€"}
        </div>
    );
}
