import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          // onClick={onClose}
          className="backdrop-blur grid place-items-center z-40 h-screen w-screen absolute top-0 "
        >
          <div className="z-50 m-auto relative min-h-[200px] min-w-[80%] bg-white p-4 ">
            <div className="flex justify-end ">
              <AiOutlineClose onClick={onClose} className="self-end text-2xl" />
            </div>
            {children}
          </div>
          {/* <div className="   " /> */}
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
