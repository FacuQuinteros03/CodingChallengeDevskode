import React, { useState, useEffect } from 'react';
import CreateFoodForm from '../food/CreateFoodForm';
import { FoodFormData, Food } from '../../models/Food';
import { foodService } from '../../services/foodService';

export default function FilterBar({ setFoods, showCreateFoodModal }) {
  const [search, setSearch] = useState(''); // Estado para el valor de búsqueda por nombre
  const [minPrice, setMinPrice] = useState(''); // Estado para el valor del precio mínimo
  const [maxPrice, setMaxPrice] = useState(''); // Estado para el valor del precio máximo
  const [showForm, setShowForm] = useState(false);

  // Maneja la creación de un nuevo alimento
  const handleCreateFood = async (food: FoodFormData) => {
    try {
      const newFood = await foodService.create(food);
      setFoods((prevFoods) => [...prevFoods, newFood]); // Agrega el nuevo alimento
      setShowForm(false); // Cierra el formulario
    } catch (error) {
      console.error('Error creando el alimento:', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Llamar a la API cuando cambia la búsqueda o los filtros
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const allFoods = await foodService.getAll(); // Obtener todos los alimentos

        // Filtrar por nombre
        const filteredFoods = allFoods.filter((food) => {
          const matchesName = food.name
            .toLowerCase()
            .includes(search.toLowerCase());

          // Filtrar por precio (si están definidos los valores de minPrice y maxPrice)
          const matchesPrice =
            (minPrice === '' || food.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || food.price <= parseFloat(maxPrice));

          return matchesName && matchesPrice;
        });

        setFoods(filteredFoods);
      } catch (error) {
        console.error('Error obteniendo alimentos:', error);
      }
    }, 500); // Espera 500ms antes de hacer la solicitud

    return () => clearTimeout(timeoutId); // Limpia el timeout si cambia el valor antes de los 500ms
  }, [search, minPrice, maxPrice, setFoods]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <select className="bg-gray-100 border rounded px-3 py-2 w-48">
          <option>Select Category</option>
          {/* Más opciones */}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)} // Actualiza el valor del precio mínimo
            className="bg-gray-100 border rounded px-3 py-2 w-24"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)} // Actualiza el valor del precio máximo
            className="bg-gray-100 border rounded px-3 py-2 w-24"
          />
        </div>
        <div className="flex-1 relative">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Actualiza el valor de búsqueda por nombre
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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

      {showForm && (
        <CreateFoodForm
          name="Crear"
          onSubmit={handleCreateFood}
          submitLabel="Crear Comida"
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
