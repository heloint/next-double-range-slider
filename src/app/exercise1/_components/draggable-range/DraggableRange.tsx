"use client";

import React, { useState, useRef, useEffect } from "react";
import SliderTrack from "./SliderTrack";
import ValueSetterButton from "./ValueSetterButton";
import { RangeData } from "../../_lib/api-calls";
import ValueDisplay from "./ValueDisplay";

export default function DraggableRange({ data }: { data: RangeData }) {
    const valueLabel = "€";
    const [minValue, setMinValue] = useState(data.minLimit);
    const [maxValue, setMaxValue] = useState(data.maxLimit);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (minValue > data.maxLimit) {
            setMinValue(data.maxLimit - 1);
            setMaxValue(data.maxLimit);
        } else if (minValue < data.minLimit) {
            setMinValue(data.minLimit);
        } else if (minValue >= maxValue) {
            setMaxValue((prevValue) => prevValue + 1);
        }
    }, [minValue, data.minLimit]);

    useEffect(() => {
        if (maxValue < data.minLimit) {
            setMinValue(data.minLimit);
            setMaxValue(data.minLimit + 1);
        } else if (maxValue > data.maxLimit) {
            setMaxValue(data.maxLimit);
        } else if (maxValue <= minValue) {
            setMinValue((prevValue) => prevValue - 1);
        }
    }, [maxValue, data.maxLimit]);

    return (
        <div className="w-full flex justify-center items-center gap-5">
            <ValueDisplay
                value={minValue}
                setValueAction={setMinValue}
                valueLabel={valueLabel}
            />
            <div
                ref={sliderRef}
                className="relative w-full max-w-md h-5 bg-slate-200 rounded-full cursor-pointer my-10 py-5"
            >
                <SliderTrack />
                <ValueSetterButton
                    sliderRef={sliderRef}
                    value={minValue}
                    setValue={setMinValue}
                />
                <ValueSetterButton
                    sliderRef={sliderRef}
                    value={maxValue}
                    setValue={setMaxValue}
                />
            </div>
            <ValueDisplay
                value={maxValue}
                setValueAction={setMaxValue}
                valueLabel={valueLabel}
            />
        </div>
    );
}
