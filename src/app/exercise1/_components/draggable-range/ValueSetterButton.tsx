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
    sliderRef,
    value,
    setValue,
}: {
    sliderRef: RefObject<HTMLDivElement | null>;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
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

        const outOfScopeMarginY = 12;
        const outOfScopeMarginX = 30;
        const scopeLimitTop = rect.top + outOfScopeMarginY;
        const scopeLimitBottom = rect.bottom - outOfScopeMarginY;
        const scopeLimitLeft = rect.left - outOfScopeMarginX;
        const scopeLimitRight = rect.right + outOfScopeMarginX;

        const isOutOfScope =
            e.clientX < scopeLimitLeft ||
            e.clientX > scopeLimitRight ||
            e.clientY < scopeLimitTop ||
            e.clientY > scopeLimitBottom;

        if (isOutOfScope) {
            removeAllHandlers();
        }

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
            <SliderThumb value={value} grabHandlerAction={addAllHandlers} />
        </span>
    );
}
function calculateNewScaleValue(offsetX: number, rect: DOMRect) {
    // console.log({offsetX, rectWidth: rect.width})
    const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1); // Keep within bounds
    const newValue = percentage * 100;
    return newValue;
}
