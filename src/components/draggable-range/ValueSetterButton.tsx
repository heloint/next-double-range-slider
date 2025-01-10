import React, {
    SetStateAction,
    Dispatch,
    RefObject,
    useRef,
    useState,
    useEffect,
} from "react";
import SliderThumb from "./SliderThumb";

export default function ValueSetterButton({
    maxLimit,
    colorClass,
    sliderRef,
    value,
    setValueAction,
    rangeValues,
}: {
    maxLimit: number;
    colorClass?: string;
    sliderRef: RefObject<HTMLDivElement | null>;
    value: number;
    setValueAction: Dispatch<SetStateAction<string | number>>;
    rangeValues?: number[];
}) {
    const thumbRef = useRef<HTMLSpanElement | null>(null);
    const [thumbParent, setThumbParent] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const thumb = thumbRef.current;
        if (!thumb) return;
        const parent = thumb.parentElement;
        if (!parent) return;
        setThumbParent(parent);
    }, [thumbRef]);

    const handleMouseDrag = (e: MouseEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;
        if (!thumbParent) return;

        const rect = slider.getBoundingClientRect();

        const scopeLimitTop = rect.top + 7;
        const scopeLimitBottom = rect.bottom - 7;
        const scopeLimitLeft = rect.left + 2;
        const scopeLimitRight = rect.right + 2;

        const isOutOfScope =
            e.clientX < scopeLimitLeft ||
            e.clientX > scopeLimitRight ||
            e.clientY < scopeLimitTop ||
            e.clientY > scopeLimitBottom;

        if (isOutOfScope) {
            removeAllHandlers();
        }

        const offsetX = e.clientX - rect.left;
        const newValue = calculateNewScaleValue(
            maxLimit,
            offsetX,
            rect,
            rangeValues
        );
        setValueAction(newValue.toFixed(2));
    };

    const handleTouchDrag = (ev: TouchEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;
        const rect = slider.getBoundingClientRect();
        const offsetX = ev.touches[0].clientX - rect.left;
        const newValue = calculateNewScaleValue(
            maxLimit,
            offsetX,
            rect,
            rangeValues
        );
        setValueAction(newValue.toFixed(2));
    };

    const removeAllHandlers = () => {
        if (!thumbParent) return;
        thumbParent.removeEventListener("mousemove", handleMouseDrag);
        thumbParent.removeEventListener("mouseup", removeAllHandlers);

        thumbParent.removeEventListener("touchmove", handleTouchDrag);
        thumbParent.removeEventListener("touchend", removeAllHandlers);
    };

    const addAllHandlers = () => {
        if (!thumbParent) return;
        thumbParent.addEventListener("mousemove", handleMouseDrag);
        thumbParent.addEventListener("mouseup", removeAllHandlers);

        thumbParent.addEventListener("touchmove", handleTouchDrag);
        thumbParent.addEventListener("touchend", removeAllHandlers);
    };

    return (
        <span ref={thumbRef}>
            <SliderThumb
                maxLimit={maxLimit}
                colorClass={colorClass}
                value={value}
                grabHandlerAction={addAllHandlers}
            />
        </span>
    );
}
function calculateNewScaleValue(
    maxLimit: number,
    offsetX: number,
    rect: DOMRect,
    values?: number[]
) {
    const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);

    if (!values) {
        const newValue = percentage * maxLimit;
        return newValue;
    }
    // Interpolate the value within the range of predefined values,
    // then, snap to the nearest value in the array
    const interpolatedValue =
        percentage * (Math.max(...values) - Math.min(...values)) +
        Math.min(...values);
    return getNearestValue(interpolatedValue, values);
}

function getNearestValue(value: number, values: number[]): number {
    return values.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
}
