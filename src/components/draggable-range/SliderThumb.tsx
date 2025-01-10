"use client";

import { useState } from "react";

export default function SliderThumb({
    maxLimit,
    colorClass,
    value,
    grabHandlerAction,
    keydownHandlerAction
}: {
    maxLimit: number,
    colorClass?: string;
    value: number;
    grabHandlerAction: (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => void;
    keydownHandlerAction: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
    const [isGrabbed, setIsGrabbed] = useState<boolean>(false);

    return (
        <div
            tabIndex={0}
            title="drag me"
            onKeyDown={keydownHandlerAction}
            onMouseDown={(e) => {
                grabHandlerAction(e);
                setIsGrabbed(true);
            }}
            onMouseUp={() => setIsGrabbed(false)}
            onMouseLeave={() => setIsGrabbed(false)}
            onTouchStart={(e) => {
                grabHandlerAction(e);
                setIsGrabbed(true);
            }}
            onTouchEnd={() => setIsGrabbed(false)}
            className={`absolute top-1/2 w-6 h-6 rounded-full \
                shadow transform -translate-x-1/2 -translate-y-1/2 transition-transform \
                duration-200 hover:scale-125 ${
                    isGrabbed ? "cursor-grabbing" : "cursor-grab"
                }
                ${colorClass ?? "bg-blue-500"}`}
            style={{ left: `${(value / maxLimit) * 100}%` }}
        ></div>
    );
}
