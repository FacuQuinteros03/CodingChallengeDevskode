import React, { useState } from 'react';
import { FoodFormData, StarTypes } from '../../models/Product';
import { FoodFormProps } from '../../models/Product';

export default function CreateFoodForm({
  onSubmit,
  onClose,
  submitLabel,
}: FoodFormProps) {
  const [formData, setFormData] = useState<FoodFormData>({
    id: 0, // Default ID
    name: '',
    ingredients: '',
    price: 0,
    stock: true,
    stars: StarTypes.One,
    image_url: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-button mb-6">
            Crear Comida
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of food"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                  required
                />
              </div>
              <div className="p-5">
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Ingredients"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                  required
                />
              </div>
              <div className="p-5">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="p-5">
                <select
                  name="stock"
                  value={formData.stock ? 'true' : 'false'}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
              <div className="p-5">
                <select
                  name="stars"
                  value={formData.stars}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                >
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-5">
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-button"
                  required
                />
              </div>
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
                className="px-4 py-2 bg-button text-white rounded hover:bg-purple-600 disabled:opacity-50 min-w-[200px]"
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
