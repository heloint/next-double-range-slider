"use client";

import {
    Dispatch,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import DialogModal from "./RangeInputModal";

export default function SliderThumb({
    value,
    setValueAction,
    valueLimit,
    limitType,
    grabHandlerAction,
}: {
    value: number;
    setValueAction: Dispatch<SetStateAction<number>>;
    valueLimit: number;
    limitType: "min" | "max";
    grabHandlerAction: (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
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
        <>
            <DialogModal modalRef={modalRef}>
                <ModalValueInput
                    value={value}
                    setValue={setValueAction}
                    valueLimit={valueLimit}
                    limitType={limitType}
                    modalRef={modalRef}
                />
            </DialogModal>
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
                duration-200 hover:scale-125 ${isGrabbed ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ left: `${value}%` }}
            ></div>
        </>
    );
}

function ModalValueInput({
    value,
    setValue,
    valueLimit,
    limitType,
    modalRef,
}: {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    valueLimit: number;
    limitType: "min" | "max";
    modalRef: RefObject<HTMLDialogElement | null>;
}) {
    const [tempValue, setTempValue] = useState<number>(value);

    const handleValueChange = (e: React.SyntheticEvent) => {
        const targetValue = Number((e.target as HTMLInputElement).value);
        setTempValue(targetValue);
    };

    const handleValueSet = () => {
        setValue(tempValue);
        if (!modalRef) return;
        modalRef.current?.close();
    };

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    return (
        <div className="flex flex-col gap-3 justify-center items-center p-10">
            <p>
                {limitType}: {valueLimit}
            </p>
            <input
                type="number"
                value={tempValue}
                onChange={handleValueChange}
                step={"0.1"}
            />
            <button
                className="py-2 px-4 rounded border border-gray-400 bg-slate-300"
                onClick={handleValueSet}
            >
                Set
            </button>
        </div>
    );
}
