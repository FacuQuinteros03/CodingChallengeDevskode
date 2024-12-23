import React, { useState } from 'react';
import { StarTypes } from '../../models/Product';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  showCreateFoodModal: () => void;
}

export interface FilterOptions {
  name: string;
  minPrice: number | null;
  maxPrice: number | null;
  stars: StarTypes | null;
}

export default function FilterBar({
  onFilterChange,
  showCreateFoodModal,
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    name: '',
    minPrice: null,
    maxPrice: null,
    stars: null,
  });

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | number | null
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          className="bg-gray-100 border rounded px-3 py-2 w-48"
          onChange={(e) =>
            handleFilterChange(
              'stars',
              e.target.value ? Number(e.target.value) : null
            )
          }
          value={filters.stars || ''}
        >
          <option value="">Select Stars</option>
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
            className="bg-gray-100 border rounded px-3 py-2 w-24"
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
            className="bg-gray-100 border rounded px-3 py-2 w-24"
            onChange={(e) =>
              handleFilterChange(
                'maxPrice',
                e.target.value ? Number(e.target.value) : null
              )
            }
            value={filters.maxPrice || ''}
          />
        </div>
        <div className="flex-1 relative">
          <input
            type="search"
            placeholder="Search"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="bg-gray-100 border rounded px-3 py-2 pl-10 w-full"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={showCreateFoodModal}
          className="bg-violet-500 hover:bg-violet-600 text-white rounded p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
