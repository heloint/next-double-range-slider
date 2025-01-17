"use client";

import React, { useState, useRef, useEffect } from "react";
import SliderTrack from "./SliderTrack";
import ValueSetterButton from "./ValueSetterButton";
import ValueDisplay from "./ValueDisplay";
import { getNearestIndex } from "./utils";

export type RangeData = {
    maxLimit: number;
    minLimit: number;
};

export type DraggableRangeProps = {
    data: RangeData;
    valueLabel: string;
    rangeValues?: number[];
    inmutableLabels?: boolean;
};

export default function DraggableRange(props: DraggableRangeProps) {
    const valueLabel = "€";
    const stepValue = 0.01;
    const [minValue, setMinValue] = useState(props.data.minLimit);
    const [maxValue, setMaxValue] = useState(props.data.maxLimit);
    const [minValueDisplay, setMinValueDisplay] = useState<string | number>(
        props.data.minLimit
    );
    const [maxValueDisplay, setMaxValueDisplay] = useState<string | number>(
        props.data.maxLimit
    );

    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const castedNum = Number(minValueDisplay);
        if (isNaN(castedNum)) return;
        if (castedNum >= maxValue) {
            if (props.rangeValues) {
                const idx = getNearestIndex(maxValue, props.rangeValues) - 1;
                const newVal = props.rangeValues[idx];
                setMinValueDisplay(newVal);
            } else {
                setMinValueDisplay(maxValue - stepValue);
            }
        } else if (castedNum < props.data.minLimit) {
            setMinValueDisplay(props.data.minLimit);
        }
        setMinValue(castedNum);
    }, [minValueDisplay, props.data.minLimit]);

    useEffect(() => {
        const castedNum = Number(maxValueDisplay);
        if (isNaN(castedNum)) return;
        if (castedNum <= minValue) {
            if (props.rangeValues) {
                const idx = getNearestIndex(minValue, props.rangeValues) + 1;
                const newVal = props.rangeValues[idx];
                setMaxValueDisplay(newVal);
            } else {
                setMaxValueDisplay(minValue + stepValue);
            }
        }
        if (castedNum > props.data.maxLimit) {
            setMaxValueDisplay(props.data.maxLimit);
        }
        setMaxValue(castedNum);
    }, [maxValueDisplay, props.data.minLimit]);

    useEffect(() => {
        if (minValue >= maxValue) {
            if (props.rangeValues) {
                const idx = getNearestIndex(maxValue, props.rangeValues) - 1;
                const newVal = props.rangeValues[idx];
                setMinValueDisplay(newVal);
                setMinValue(newVal);
            } else {
                const newMinVal = maxValue - stepValue;
                setMinValueDisplay(newMinVal);
                setMinValue(newMinVal);
            }
        } else if (minValue < props.data.minLimit) {
            setMinValueDisplay(props.data.minLimit);
            setMinValue(props.data.minLimit);
        }
    }, [minValue, props.data.minLimit]);

    useEffect(() => {
        if (maxValue <= minValue) {
            if (props.rangeValues) {
                const idx = getNearestIndex(minValue, props.rangeValues) + 1;
                const newVal = props.rangeValues[idx];
                setMaxValueDisplay(newVal);
                setMaxValue(newVal);
            } else {
                const newMaxVal = minValue + stepValue;
                setMaxValueDisplay(newMaxVal);
                setMaxValue(newMaxVal);
            }
        } else if (maxValue > props.data.maxLimit) {
            setMaxValueDisplay(props.data.maxLimit);
            setMaxValue(props.data.maxLimit);
        }
    }, [maxValue, props.data.maxLimit]);
    return (
        <div className="w-full flex justify-center items-center gap-1 sm:gap-5">
            <ValueDisplay
                inmutable={props.inmutableLabels ?? false}
                valueLabel={valueLabel}
                valueDisplay={minValueDisplay}
                setValueDisplayAction={setMinValueDisplay}
            />
            <div
                ref={sliderRef}
                className="relative w-full max-w-md h-5 bg-slate-200 rounded-full cursor-pointer my-10 py-5"
            >
                <SliderTrack />
                <ValueSetterButton
                    maxLimit={props.data.maxLimit}
                    colorClass="bg-violet-500"
                    sliderRef={sliderRef}
                    value={minValue}
                    setValueAction={setMinValueDisplay}
                    rangeValues={props.rangeValues}
                />
                <ValueSetterButton
                    maxLimit={props.data.maxLimit}
                    sliderRef={sliderRef}
                    value={maxValue}
                    setValueAction={setMaxValueDisplay}
                    rangeValues={props.rangeValues}
                />
            </div>
            <ValueDisplay
                inmutable={props.inmutableLabels ?? false}
                valueLabel={valueLabel}
                valueDisplay={maxValueDisplay}
                setValueDisplayAction={setMaxValueDisplay}
            />
        </div>
    );
}
