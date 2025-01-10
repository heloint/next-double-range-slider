"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function ValueDisplay({
    value,
    valueLabel,
    setValueAction,
}: {
    value: number;
    valueLabel?: string;
    setValueAction: Dispatch<SetStateAction<number>>;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tmpValue, setTmpValue] = useState<string>(value.toString());

    useEffect(() => {
        const num = Number(tmpValue);
        if (!isNaN(num)) {
            setValueAction(num);
        }
    }, [tmpValue]);

    useEffect(() => {
        setTmpValue(value.toString());
    }, [value]);

    const handleInputChange = (e: React.SyntheticEvent) => {
        if (!inputRef) return;
        if (!inputRef.current) return;
        let inputValue = inputRef.current.value.replace(/[^0-9.]/g, "").trim();

        setTmpValue(inputValue);
    };

    return (
        <div>
            <input
                ref={inputRef}
                className="text-sm text-center font-medium text-gray-700 w-16"
                type={"text"}
                maxLength={15}
                value={tmpValue}
                onChange={handleInputChange}
            />
            <span className="px-1">{valueLabel}</span>
        </div>
    );
}
