import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-bold flex items-center justify-center w-full">
            <img src="public/circle.svg" alt="" />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
          >
            <FaTimesCircle className="h-5 w-5" />
          </button>
        </div>
        <p className="text-blue-950 font-bold text-xl mb-4 text-center">
          Are you sure you want to delete this item?
        </p>
        <div className="flex flex-col justify-center space-y-4 items-center">
          <button
            onClick={onConfirm}
            className="px-6 py-3 text-xl bg-red-400 text-white font-semibold rounded hover:bg-red-500 border-2 border-red-400"
          >
            DELETE
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-xl bg-gray-200  text-button font-semibold rounded hover:bg-gray-300 border-2 border-button "
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
