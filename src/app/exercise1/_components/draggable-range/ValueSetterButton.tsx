import React, {
    SetStateAction,
    Dispatch,
    RefObject,
    useRef,
} from "react";
import ValueDisplay from "./ValueDisplay";
import SliderThumb from "./SliderThumb";

export default function ValueSetterButton({
    sliderRef,
    value,
    setValue,
    valueLimit,
    valueLabel,
    limitType,
}: {
    sliderRef: RefObject<HTMLDivElement | null>;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    valueLimit: number;
    valueLabel?: string;
    limitType: "min" | "max"
}) {
    const thumbRef = useRef<HTMLSpanElement | null>(null);
    const handleMouseDrag = (e: MouseEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newValue = calculateNewScaleValue(offsetX, rect);
        setValue(newValue);
    };

    const handleTouchDrag = (ev: TouchEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;
        const rect = slider.getBoundingClientRect();
        const offsetX = ev.touches[0].clientX - rect.left;
        const newValue = calculateNewScaleValue(offsetX, rect);
        setValue(newValue);
    };

    const handleGrabSelector = () => {
        const thumb = thumbRef.current;
        if (!thumb) return;
        const thumbParent = thumb.parentElement;
        if (!thumbParent) return;
        thumbParent.addEventListener("mousemove", handleMouseDrag);
        thumbParent.addEventListener("mouseup", handleLetSelector);

        thumbParent.addEventListener("touchmove", handleTouchDrag);
        thumbParent.addEventListener("touchend", handleLetSelector);
    };

    const handleLetSelector = () => {
        const thumb = thumbRef.current;
        if (!thumb) return;
        const thumbParent = thumb.parentElement;
        if (!thumbParent) return;
        thumbParent.removeEventListener("mousemove", handleMouseDrag);
        thumbParent.removeEventListener("mouseup", handleLetSelector);

        thumbParent.removeEventListener("touchmove", handleTouchDrag);
        thumbParent.removeEventListener("touchend", handleLetSelector);
    };
    return (
        <span ref={thumbRef}>
            <SliderThumb value={value} setValueAction={setValue} valueLimit={valueLimit} grabHandlerAction={handleGrabSelector} limitType={limitType} />
            <ValueDisplay value={value} valueLabel={valueLabel} />
        </span>
    );
}
function calculateNewScaleValue(offsetX: number, rect: DOMRect) {
    const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1); // Keep within bounds
    const newValue = percentage * 100; // Scale to 0-100
    return newValue;
}
