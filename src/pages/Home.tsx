import React, { useState, useEffect } from 'react';
import FoodList from '../components/food/FoodList';
import { foodService } from '../services/productService';
import { Food, FoodFormData } from '../models/Product';
import CreateFoodForm from '../components/food/CreateFoodForm';
import FilterBar from '../components/header/FilterBar';
import { FilterOptions } from '../models/Product';
import LoadingBurger from '../components/food/LoadingBurguer';

function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [foodCount, setFoodCount] = useState<number>(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    setFoodCount(filteredFoods.length);
  }, [filteredFoods]);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const data = await foodService.getAll();
      setFoods(data);
      setFilteredFoods(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener alimentos:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    const filtered = foods.filter((food) => {
      const nameMatch = food.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const minPriceMatch =
        filters.minPrice === null || food.price >= filters.minPrice;
      const maxPriceMatch =
        filters.maxPrice === null || food.price <= filters.maxPrice;
      const starsMatch = filters.stars === null || food.stars === filters.stars;

      return nameMatch && minPriceMatch && maxPriceMatch && starsMatch;
    });

    setFilteredFoods(filtered);
  };

  const showCreateFoodModal = (food?: Food) => {
    setSelectedFood(food || null);
    setShowCreateForm(true);
  };

  const onSubmitCreateFood = async (food: FoodFormData) => {
    try {
      const newFood = await foodService.create(food);
      setFoods((prevFoods) => [...prevFoods, newFood]);
      setFilteredFoods((prevFiltered) => [...prevFiltered, newFood]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating the product:', error);
    }
  };

  const onUpdate = async (updatedFood: FoodFormData) => {
    try {
      const id = updatedFood.id;
      if (id === undefined) {
        throw new Error('ID is undefined');
      }
      const updated = await foodService.update(updatedFood.id, updatedFood);
      setFoods((prevFoods) =>
        prevFoods.map((food) => (food.id === id ? updated : food))
      );
      setFilteredFoods((prevFiltered) =>
        prevFiltered.map((food) => (food.id === id ? updated : food))
      );
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error updating the product:', error);
    }
  };

  const mapToFoodFormData = (food: Food): FoodFormData => ({
    id: food.id,
    name: food.name,
    ingredients: food.ingredients,
    price: food.price,
    stock: food.stock,
    stars: food.stars,
    image_url: food.image_url,
  });

  const handleDelete = async (id: number) => {
    try {
      await foodService.deleteById(id);
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
      setFilteredFoods((prevFiltered) =>
        prevFiltered.filter((food) => food.id !== id)
      );
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold p-4">Home Page</h1>
        <p className="text-xl font-bold">Total Results: {foodCount}</p>
      </div>
      <FilterBar
        onFilterChange={handleFilterChange}
        showCreateFoodModal={() => showCreateFoodModal()}
      />
      {loading ? (
        <LoadingBurger />
      ) : (
        <>
          <FoodList
            foods={filteredFoods}
            onDelete={handleDelete}
            onUpdate={onUpdate}
          />
          {filteredFoods.length === 0 && (
            <p className="text-gray-500 mt-4 text-center">No results</p>
          )}
          {showCreateForm && (
            <CreateFoodForm
              initialData={
                selectedFood ? mapToFoodFormData(selectedFood) : undefined
              }
              onSubmit={selectedFood ? onUpdate : onSubmitCreateFood}
              submitLabel={'Create'}
              onClose={() => setShowCreateForm(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
