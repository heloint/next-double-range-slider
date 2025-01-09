"use client";

import React, { useState, useRef, useEffect } from "react";
import SliderTrack from "./SliderTrack";
import ValueSetterButton from "./ValueSetterButton";
import { RangeData } from "../../_lib/api-calls";

export default function DraggableRange({ data }: { data: RangeData }) {
    const valueLabel = "€";
    const [minValue, setMinValue] = useState(data.defaultMinValue);
    const [maxValue, setMaxValue] = useState(data.defaultMaxValue);
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
        <div
            ref={sliderRef}
            className="relative w-full max-w-md h-5 bg-slate-200 rounded-full cursor-pointer my-10 py-5"
        >
            <SliderTrack />
            <ValueSetterButton
                sliderRef={sliderRef}
                value={minValue}
                setValue={setMinValue}
                valueLimit={data.minLimit}
                valueLabel={valueLabel}
                limitType={"min"}
            />
            <ValueSetterButton
                sliderRef={sliderRef}
                value={maxValue}
                setValue={setMaxValue}
                valueLimit={data.maxLimit}
                valueLabel={valueLabel}
                limitType={"max"}
            />
        </div>
    );
}
