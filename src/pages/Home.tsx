import React, { useState, useEffect } from 'react';
import FoodList from '../components/food/FoodList';
import FilterBar from '../components/header/FilterBar';
import { foodService } from '../services/foodService';
import { Food, FoodFormData } from '../models/Food';
import CreateFoodForm from '../components/food/CreateFoodForm';

function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  // Consulta la lista de comidas
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const data = await foodService.getAll();
      setFoods(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener alimentos:', error);
      setLoading(false);
    }
  };

  // Muestra el modal para crear una comida
  const showCreateFoodModal = () => {
    setShowCreateForm((prev) => !prev);
  };

  // Crear un producto
  const onSubmitCreateFood = async (food: FoodFormData) => {
    try {
      const newFood = await foodService.create(food);
      setFoods((prevFoods) => [...prevFoods, newFood]);
      showCreateFoodModal();
    } catch (error) {
      console.error('Error al crear el alimento:', error);
    }
  };

  //Borrar un producto
  const handleDelete = async (id: string) => {
    try {
      await foodService.deleteById(id);
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
    } catch (error) {
      console.error('Error eliminando el alimento:', error);
    }
  };

  const handleUpdate = async (id: string, foodData: FoodFormData) => {
    try {
      const updatedFood = await foodService.update(id, foodData); // Pasa el id y los datos
      setFoods(
        (prevFoods) =>
          prevFoods.map((food) => (food.id === id ? updatedFood : food)) // Actualiza la lista
      );
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold p-4">Home Page</h1>
      <FilterBar
        setFoods={setFoods}
        showCreateFoodModal={showCreateFoodModal}
      />
      {loading ? (
        <p>CARGANDO...</p>
      ) : (
        <>
          <FoodList
            foods={foods}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
          {showCreateForm && (
            <CreateFoodForm
              name="nombre"
              onSubmit={onSubmitCreateFood}
              submitLabel="Crear Comida"
              onClose={showCreateFoodModal}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
