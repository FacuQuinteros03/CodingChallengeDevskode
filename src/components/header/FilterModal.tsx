import React, { useState } from 'react';

export default function FilterModal({
  filters,
  handleApplyFilters, // Nueva función para aplicar los filtros
  setIsModalOpen,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleLocalFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    handleApplyFilters(localFilters); // Aplica los filtros globalmente
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:hidden">
      <div className="bg-white rounded-lg  max-w-md p-6 relative w-[358px]">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Filter Products</h2>
        <div className="flex flex-col space-y-4">
          <select
            className="bg-gray-200 text-gray-600 font-semibold border rounded px-2 py-2 w-full"
            onChange={(e) =>
              handleLocalFilterChange('stars', e.target.value || null)
            }
            value={localFilters.stars || ''}
          >
            <option value="">Select Category</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="bg-gray-200 text-gray-600 font-semibold border rounded px-3 py-2 w-full"
              onChange={(e) =>
                handleLocalFilterChange(
                  'minPrice',
                  e.target.value ? Number(e.target.value) : null
                )
              }
              value={localFilters.minPrice || ''}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="bg-gray-200 text-gray-600 font-semibold border rounded px-3 py-2 w-full"
              onChange={(e) =>
                handleLocalFilterChange(
                  'maxPrice',
                  e.target.value ? Number(e.target.value) : null
                )
              }
              value={localFilters.maxPrice || ''}
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <input
              type="search"
              placeholder="Search"
              value={localFilters.name || ''}
              onChange={(e) => handleLocalFilterChange('name', e.target.value)}
              className="bg-gray-200 text-gray-600 font-semibold border rounded px-3 py-2 pl-10 w-full"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-button hover:bg-violet-600 text-white rounded py-2"
        >
          Filter Products
        </button>
      </div>
    </div>
  );
}
