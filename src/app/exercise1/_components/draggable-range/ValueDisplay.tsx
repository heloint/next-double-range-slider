export default function ValueDisplay({
    value,
    valueLabel,
}: {
    value: number;
    valueLabel?: string;
}) {
    return (
        <div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700"
            style={{ left: `${value}%` }}
        >
            {value.toFixed(2)} {valueLabel ?? "€"}
        </div>
    );
}
