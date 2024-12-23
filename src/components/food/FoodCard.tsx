import React, { useState } from 'react';
import { FoodFormData } from '../../models/Product';
import Rating from '@mui/material/Rating';
import EditFoodForm from './EditFoodForm';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { ConfirmationModal } from './ConfirmationModal';
import { foodService } from '../../services/productService';

export default function FoodCard({ food, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // const response = await  foodService.update(id, updatedFood);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(food.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <div className="absolute top-2 right-2 flex space-x-2 text-gray-500 z-10">
          <FaPencilAlt
            onClick={handleEdit}
            className="cursor-pointer hover:text-gray-700"
            title="Edit"
          />
          <FaTrash
            onClick={handleDelete}
            className="cursor-pointer hover:text-gray-700"
            title="Delete"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 h-48 p-4">
            <img
              src={food.image_url}
              alt={food.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold mb-4">{food.name}</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-600">{food.ingredients}</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 mb-2 md:mb-0">
                <div>
                  <span className="font-semibold">Price: </span>${' '}
                  {food.price.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold">Availability: </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      food.stock
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {food.stock ? 'In Stock!' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Rating
                  name={`food-rating-${food.id}`}
                  value={food.stars}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <EditFoodForm
              name="Update"
              onSubmit={handleSave}
              initialData={food}
              submitLabel="Update"
              onClose={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
