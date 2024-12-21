import React from 'react';
import FoodCard from './FoodCard';

const FoodList = ({ foods, onDelete, onUpdate }) => {
  const handleUpdate = async (foodId: string) => {
    console.log(`Updating food with ID: ${foodId}`);
    // Aquí podrías implementar la lógica de actualización, si es necesario.
    // Por ahora dejamos el console.log como marcador.
  };

  return (
    <div>
      {foods.length === 0 ? (
        <p>No hay alimentos disponibles.</p>
      ) : (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              <FoodCard
                id={food.id}
                name={food.name}
                description={food.description}
                price={food.price}
                availability={food.availability}
                rating={food.rating}
                image={food.image}
                onUpdate={() => onUpdate(food.id)}
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
