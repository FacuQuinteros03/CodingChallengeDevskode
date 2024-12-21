// models/Food.ts
export interface Food {
  name: string;
  description: string;
  price: number;
  availability: boolean;
  rating: number;
  image: string;
  id: string;
}

export type FoodFormData = {
  name: string;
  description: string;
  price: number;
  availability: boolean;
  rating: number;
  image: string;
  id: string;
};

export interface FoodFormProps {
  onSubmit: (data: FoodFormData) => Promise<void>; // Función para crear comida
  onUpdate?: (foodId: string, updatedFood: FoodFormData) => Promise<void>; // Función opcional para editar comida
  initialData?: FoodFormData; // Datos iniciales para la edición
  name: string;
  submitLabel: string;
  onClose?: () => void;
}

export interface FoodListProps {
  foods: Food[]; // Recibe la lista de alimentos
  setFoods: (newFoods: Food[]) => void;
}
// models/Food.ts
export interface FilterBarProps {
  onAddFood: (food: Food) => void; // Función para agregar un nuevo alimento
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>; // Si sigues manejando filtros
}
