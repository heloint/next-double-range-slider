"use client";

import { ReactNode, RefObject, useRef } from "react";

type DialogModalProps = {
    children: ReactNode;
    modalRef: RefObject<HTMLDialogElement | null>
};

export default function DialogModal(props: DialogModalProps) {

    return (
        <div>
            <dialog ref={props.modalRef} className="w-full lg:w-fit rounded-xl shadow-2xl">
                <div className=" w-full grid grid-cols-12 gap-3 ">
                    <div className="col-span-10 lg:col-span-11">{props.children}</div>
                    <div className="grid items-start justify-start">
                        <button
                            onClick={() => {
                                if (props.modalRef) {
                                    props.modalRef.current?.close();
                                }
                            }}
                            type="button"
                            title="Close modal"
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 "
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
