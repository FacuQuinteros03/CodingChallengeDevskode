import React, { useState } from 'react';
import { useScrollLock } from './../../hooks/useScrollLock'; // Importa el hook
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useScrollLock(true);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name of food is required';
    if (!formData.ingredients.trim())
      newErrors.ingredients = 'Ingredients are required';
    if (!formData.price || formData.price <= 0)
      newErrors.price = 'Price must be greater than 0';
    if (!formData.image_url.trim() || !isValidUrl(formData.image_url))
      newErrors.image_url = 'A valid Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

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

    if (!validateForm()) {
      return;
    }
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
      <div className="bg-white rounded-lg w-full max-w-[1000px]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold text-button p-4">
            Create Product
          </h2>
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
              <div className="p-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of food"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-focusForm'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="p-5">
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Ingredients"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.ingredients
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-focusForm'
                  }`}
                />
                {errors.ingredients && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ingredients}
                  </p>
                )}
              </div>

              <div className="p-5">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.price
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-focusForm'
                  }`}
                  required
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div className="p-5">
                <select
                  name="stock"
                  value={formData.stock ? 'true' : 'false'}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-focusForm"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-focusForm"
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
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.image_url
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-focusForm'
                  }`}
                />
                {errors.image_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image_url}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-button text-white rounded hover:bg-purple-600 disabled:opacity-50 w-full md:w-[233px]"
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
