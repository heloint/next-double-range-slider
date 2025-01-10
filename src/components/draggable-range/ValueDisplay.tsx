"use client";

import { Dispatch, SetStateAction, useRef } from "react";

export default function ValueDisplay({
    inmutable,
    valueLabel,
    valueDisplay,
    setValueDisplayAction,
}: {
    inmutable?: boolean;
    valueLabel?: string;
    valueDisplay: string | number;
    setValueDisplayAction: Dispatch<SetStateAction<string | number>>;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = () => {
        if (!inputRef) return;
        if (!inputRef.current) return;
        const inputValue = inputRef.current.value
            .replace(/[^0-9.]/g, "")
            .trim();
        setValueDisplayAction(inputValue);
    };
    return (
        <div className="flex justify-center items-center">
            {inmutable ? (
                <span>{valueDisplay}</span>
            ) : (
                <input
                    readOnly={inmutable ?? false}
                    disabled={inmutable ?? false}
                    ref={inputRef}
                    className="text-sm text-center font-medium text-gray-700 w-8"
                    type={"text"}
                    maxLength={15}
                    value={valueDisplay}
                    onChange={handleInputChange}
                />
            )}
            <span className="px-1">{valueLabel}</span>
        </div>
    );
}
