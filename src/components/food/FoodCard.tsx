import React, { useState, useEffect } from 'react';
import { FoodForm } from './FoodForm';
import { ConfirmationModal } from './ConfirmationModal';
import { FoodFormData } from '../../models/Food';
import Rating from '@mui/material/Rating';

export default function FoodCard({
  id,
  name,
  description,
  price,
  availability,
  rating,
  image,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedFood: FoodFormData) => {
    // Llama a la función de actualización
    await onUpdate(updatedFood); // Si onUpdate es una promesa, espera a que se resuelva
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden p-5">
      <div className="flex flex-col md:flex-row shadow-lg">
        <div className="md:w-72 h-48 p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1 p-6">
          {isEditing ? (
            <FoodForm
              name="Update"
              onSubmit={handleSave}
              initialData={{
                id,
                name,
                description,
                price,
                availability,
                rating,
                image,
              }}
              submitLabel="Update"
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <>
              <h3 className="text-xl font-bold mb-4">{name}</h3>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{description}</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 mb-2 md:mb-0">
                  <div>
                    <span className="font-semibold">Price: </span>$
                    {price.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold">Availability: </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        availability
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {availability ? 'In Stock!' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    // ARREGLAR ESTRELLAS
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
