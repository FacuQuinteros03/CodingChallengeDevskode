import React, { useState, useEffect } from 'react';
import { FoodFormData, StarTypes } from '../../models/Product';
import { FoodFormProps } from '../../models/Product';
import { foodService } from '../../services/productService';

export default function EditFoodForm({
  onSubmit,
  onClose,
  submitLabel,
  initialData,
}: FoodFormProps) {
  const [formData, setFormData] = useState<FoodFormData>(
    initialData || {
      id: 0,
      name: '',
      ingredients: '',
      price: 0,
      stock: true,
      stars: StarTypes.One,
      image_url: '',
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
      stock: name === 'stock' ? value === 'true' : prev.stock,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setIsSubmitting(true);
    try {
      const updatedFood = await foodService.update(formData.id, formData);
      onSubmit(updatedFood);
    } catch (error) {
      console.error('Error updating food:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-button">Editar Comida</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name of food"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                required
              />
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Ingredients"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                required
                min="0"
                step="0.01"
              />
              <select
                name="stock"
                value={formData.stock ? 'true' : 'false'}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-button"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
              <select
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-button"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Stars
                  </option>
                ))}
              </select>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                required
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-button text-white rounded hover:bg-button-dark disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
