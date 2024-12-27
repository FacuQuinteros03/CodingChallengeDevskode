'use client';

import React, { useState } from 'react';
import { StarTypes } from '../../models/Product';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FilterContent } from './FilterContent';
import FilterModal from './FilterModal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | number | null
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Desktop View - Unchanged */}
      <div className="hidden md:flex justify-center gap-8 mb-8 w-full">
        <FilterContent
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <button
          onClick={showCreateFoodModal}
          className="bg-button hover:bg-violet-600 text-white rounded-full p-3"
        >
          <FaPlus />
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:flex,flex-col,w-full">
        <div className="md:hidden flex gap-2 w-full px-4 mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-button text-icon font-semibold rounded px-4 py-2 flex items-center justify-center"
          >
            <FaFilter className="text-icon" />
            FILTER
          </button>
        </div>

        <div className="md:hidden flex gap-2 w-full px-4 mb-8">
          <button
            className="flex-1 bg-stockTrue text-icon font-semibold rounded px-4 py-2 flex items-center justify-center"
            onClick={showCreateFoodModal}
          >
            <FaPlus className="text-icon" />
            Add Food
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isModalOpen && (
        <FilterModal
          filters={filters}
          handleFilterChange={handleFilterChange}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
