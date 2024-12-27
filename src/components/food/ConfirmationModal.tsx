import React from 'react';
import { useScrollLock } from './../../hooks/useScrollLock';
import { BsXCircle } from 'react-icons/bs';
import { ConfirmationModalProps } from '../../models/Product';

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full m-4">
        <div className="flex justify-center items-center mb-4 relative">
          <h2 className="text-xl font-bold flex items-center justify-center w-full">
            <BsXCircle size={100} className="text-stockFalse" />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-0 right-0"
            aria-label="Cerrar"
          ></button>
        </div>
        <p className="text-blue-950 font-bold text-[1.3rem] mb-4 text-center px-4">
          ¿Are you sure you want to delete this item?
        </p>
        <div className="flex flex-col justify-center items-center gap-4 sm:flex-row">
          <button
            onClick={onClose}
            className="px-6 py-2 text-lg bg-gray-200 text-button font-semibold rounded-lg hover:bg-gray-300 border-2 border-button transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-lg bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 border-2 border-red-400 transition-colors"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
