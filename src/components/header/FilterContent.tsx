import React from 'react';

export const FilterContent = ({ filters, handleFilterChange }) => {
  return (
    <>
      {/* Categoria */}
      <select
        className="bg-gray-200 text-gray-600 font-semibold border rounded px-2 py-2 w-48"
        onChange={(e) => handleFilterChange('stars', e.target.value || null)}
        value={filters.stars || ''}
      >
        <option value="">Select Category</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      {/* MIN - MAX */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          className="bg-gray-200 text-gray-600 font-semibold border rounded px-3 py-2 w-24"
          onChange={(e) =>
            handleFilterChange(
              'minPrice',
              e.target.value ? Number(e.target.value) : null
            )
          }
          value={filters.minPrice || ''}
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Max"
          className="bg-gray-200 text-gray-600 font-semibold border rounded px-3 py-2 w-24"
          onChange={(e) =>
            handleFilterChange(
              'maxPrice',
              e.target.value ? Number(e.target.value) : null
            )
          }
          value={filters.maxPrice || ''}
        />
      </div>
      {/* BUSCADOR */}
      <div className="flex items-center justify-center mx-2 w-64">
        <input
          type="search"
          placeholder="Search"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="bg-gray-200 text-gray-600 font-semibold border rounded px-3 py-2 pl-10 w-full"
        />
      </div>
    </>
  );
};
