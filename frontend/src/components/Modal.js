// src/components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Welcome!</h2>
        <p className="mt-2">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 text-[#39FF14] border border-[#39FF14] px-4 py-2 rounded hover:bg-[#39FF14] hover:text-gray-900 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
