'use client';
import React, { useState, useEffect } from 'react';
import { FoodFormData, FoodFormProps } from '../../models/Food';

export function FoodForm({
  onSubmit,
  initialData,
  name,
  submitLabel,
  onClose,
  onUpdate, // Recibe también la función onUpdate para la edición
}: FoodFormProps) {
  const [formData, setFormData] = useState<FoodFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    availability: initialData?.availability || true,
    rating: initialData?.rating || 0,
    image: initialData?.image || '',
    id: initialData?.id || '', // Esto es importante para la edición
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Si hay datos iniciales, pre-pobla el formulario
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        availability: initialData.availability,
        rating: initialData.rating,
        image: initialData.image,
        id: initialData.id, // Asegúrate de tener el id para la edición
      });
    }
  }, [initialData]); // Actualiza cuando los datos iniciales cambian

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        // Si hay datos iniciales, se está editando, entonces usamos onUpdate
        await onUpdate?.(initialData.id, formData);
      } else {
        // Si no hay datos iniciales, se está creando
        await onSubmit(formData);
      }
      if (onClose) onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-purple-500 mb-6">
            {initialData ? 'Editar Comida' : 'Crear Comida'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name of food"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ingredients"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <select
                name="availability"
                value={formData.availability ? 'true' : 'false'}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
