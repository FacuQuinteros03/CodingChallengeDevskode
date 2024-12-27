'use client';
import React, { useState } from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FilterContent } from './FilterContent';
import FilterModal from './FilterModal';
import { FilterOptions, FilterBarProps } from './../../models/Product';

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

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters); // Actualiza los filtros globalmente
    onFilterChange(newFilters); // Propaga los filtros actualizados
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex justify-center gap-8 mb-8 w-full">
        <FilterContent
          filters={filters}
          handleFilterChange={(key, value) =>
            handleApplyFilters({ ...filters, [key]: value })
          }
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
          handleApplyFilters={handleApplyFilters} // Pasa la función de aplicar filtros
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
