"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";

export default function SliderThumb({
    value,
    grabHandlerAction,
}: {
    value: number;
    grabHandlerAction: (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => void;
}) {
    const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleModal = () => {
        const modal = modalRef.current;
        if (!modal) return;

        modal.showModal();
    };

    return (
        <div
            title="drag me"
            onClick={handleModal}
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
            className={`absolute top-1/2 w-6 h-6 bg-blue-500 rounded-full \
                shadow transform -translate-x-1/2 -translate-y-1/2 transition-transform \
                duration-200 hover:scale-125 ${
                    isGrabbed ? "cursor-grabbing" : "cursor-grab"
                }`}
            style={{ left: `${value}%` }}
        ></div>
    );
}
