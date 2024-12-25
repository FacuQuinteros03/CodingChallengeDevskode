import React from 'react';
import FoodCard from './FoodCard';

const FoodList = ({ foods, onDelete, onUpdate }) => {
  return (
    <div>
      {foods.length === 0 ? (
        <p>No hay alimentos disponibles.</p>
      ) : (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              <FoodCard
                food={food}
                onUpdate={(updatedFood) => onUpdate(updatedFood)}
                onDelete={() => onDelete(food.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodList;
